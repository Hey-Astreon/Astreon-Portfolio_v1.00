import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, createPortal, useThree } from '@react-three/fiber';
import { useFBO } from '@react-three/drei';

// Simulation shader for GPGPU
const simulationVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const simulationFragmentShader = `
  uniform sampler2D uPositions;
  uniform float uTime;
  uniform float uCurlFreq;
  uniform float uSingularity;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simple Curl Noise implementation
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g0 = step(x0.yzx, x0.xyz);
    vec3 l0 = 1.0 - g0;
    vec3 i1 = min( g0.xyz, l0.zxy );
    vec3 i2 = max( g0.xyz, l0.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1 Bradford,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec3 pos = texture2D(uPositions, vUv).rgb;
    vec3 noise = vec3(
      snoise(pos * uCurlFreq + uTime * 0.1),
      snoise(pos * uCurlFreq + uTime * 0.1 + 10.0),
      snoise(pos * uCurlFreq + uTime * 0.1 + 20.0)
    );

    // Mouse influence
    vec2 mouse = uMouse * 5.0;
    float dist = distance(pos.xy, mouse);
    vec3 dir = pos - vec3(mouse, 0.0);
    pos += normalize(dir) * (1.0 / (dist + 1.0)) * 0.02;

    pos += noise * 0.005;

    // Singularity pull
    vec3 pull = -normalize(pos) * uSingularity * 0.05;
    pos += pull;

    // Boundary check
    if (length(pos) > 15.0) pos *= 0.9;

    gl_FragColor = vec4(pos, 1.0);
  }
`;

// Rendering shaders
const renderVertexShader = `
  uniform sampler2D uPositions;
  uniform float uTime;
  uniform float uSize;
  uniform float uWarp;
  varying vec2 vUv;
  varying float vDistance;

  void main() {
    vUv = uv;
    vec3 pos = texture2D(uPositions, uv).rgb;
    vDistance = length(pos);

    // Warp Stretch
    vec3 warpPos = pos + normalize(pos) * uWarp * 4.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(warpPos, 1.0);
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
    
    // Stretch point based on warp
    if (uWarp > 0.1) {
       gl_PointSize *= (1.0 + uWarp * 2.0);
    }
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const renderFragmentShader = `
  varying float vDistance;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);

    vec3 color = mix(uColor1, uColor2, vDistance * 0.1);
    gl_FragColor = vec4(color, strength * 0.6);
  }
`;

export function AetherEngine() {
  const size = 128; // 128x128 = 16,384 particles
  const pointsRef = useRef<THREE.Points>(null);
  const simMaterialRef = useRef<THREE.ShaderMaterial>(null);
  
  const scene = useMemo(() => new THREE.Scene(), []);
  const camera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);
  const renderTarget1 = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });
  const renderTarget2 = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  const targetRef = useRef(renderTarget1);
  const otherRef = useRef(renderTarget2);

  const positions = useMemo(() => {
    const data = new Float32Array(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = (Math.random() - 0.5) * 10;
      data[i * 4 + 1] = (Math.random() - 0.5) * 10;
      data[i * 4 + 2] = (Math.random() - 0.5) * 10;
      data[i * 4 + 3] = 1.0;
    }
    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const particlesUv = useMemo(() => {
    const uv = new Float32Array(size * size * 2);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = y * size + x;
        uv[i * 2] = x / size;
        uv[i * 2 + 1] = y / size;
      }
    }
    return uv;
  }, []);

  const uniforms = useMemo(() => ({
    uPositions: { value: positions },
    uTime: { value: 0 },
    uWarp: { value: 0 },
    uSingularity: { value: 0 },
    uCurlFreq: { value: 0.25 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color('#bf94ff') },
    uColor2: { value: new THREE.Color('#4dadeb') },
    uSize: { value: 0.8 },
  }), [positions]);

  useFrame((state) => {
    const { gl, pointer } = state;
    
    // 1. Update Simulation
    if (simMaterialRef.current) {
      simMaterialRef.current.uniforms.uPositions.value = targetRef.current.texture;
      simMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      simMaterialRef.current.uniforms.uMouse.value.set(pointer.x, pointer.y);
    }

    gl.setRenderTarget(otherRef.current);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Swap targets
    const temp = targetRef.current;
    targetRef.current = otherRef.current;
    otherRef.current = temp;

    // 2. Update Render
    if (pointsRef.current) {
      // @ts-ignore
      pointsRef.current.material.uniforms.uPositions.value = targetRef.current.texture;
    }
  });

  return (
    <group>
      {/* Simulation Portal */}
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial
            ref={simMaterialRef}
            vertexShader={simulationVertexShader}
            fragmentShader={simulationFragmentShader}
            uniforms={uniforms}
          />
        </mesh>,
        scene
      )}

      {/* Rendering Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={size * size}
            array={new Float32Array(size * size * 3)}
            itemSize={3}
            args={[new Float32Array(size * size * 3), 3]}
          />
          <bufferAttribute
            attach="attributes-uv"
            count={size * size}
            array={particlesUv}
            itemSize={2}
            args={[particlesUv, 2]}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexShader={renderVertexShader}
          fragmentShader={renderFragmentShader}
          uniforms={uniforms}
        />
      </points>
    </group>
  );
}
