import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Points, PointMaterial, Text } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { AetherEngine } from './AetherEngine';

// --- Shader Background Components ---
const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform float uScrollY;

#define PI 3.14159265359

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uTime * 0.15; // Slightly slower for better perf/feel
  float scrollOffset = uScrollY * 0.0005;
  
  vec2 st = uv;
  st.y += scrollOffset;
  
  float n1 = snoise(vec2(st.x * 3.0, st.y * 2.0 - t));
  float n2 = snoise(vec2(st.x * 5.0 + t, st.y * 4.0 - t * 1.5));
  
  float noise = n1 * 0.6 + n2 * 0.4;
  
  vec3 absoluteBlack = vec3(0.0, 0.0, 0.0); 
  vec3 electricViolet = vec3(0.749, 0.58, 1.0); // #bf94ff
  vec3 deepSpace = vec3(0.02, 0.02, 0.04);
  vec3 auroraBlue = vec3(0.3, 0.68, 0.92); // #4dadeb
  
  vec3 color = absoluteBlack;
  float f1 = smoothstep(-0.2, 0.8, noise);
  float f2 = smoothstep(0.4, 1.0, noise);
  
  color = mix(color, deepSpace, f1 * 0.15);
  color = mix(color, electricViolet, f2 * 0.06);
  color = mix(color, auroraBlue, f1 * f2 * 0.04);
  
  // Vignette
  float dist = distance(uv, vec2(0.5));
  color *= smoothstep(1.0, 0.2, dist * 0.7);

  gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

function BackgroundShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uScrollY: { value: 0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScrollY.value = window.scrollY;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

// --- Hero 3D Components ---
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const stride = i * 3;
      const r = 10 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[stride] = r * Math.sin(phi) * Math.cos(theta);
      pos[stride + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[stride + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
      
      // Reactive "swirl" based on mouse
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;
      ref.current.rotation.z += (mouseX * 0.01);
      
      const opacity = Math.max(0, 1 - window.scrollY / 1000);
      if (ref.current.material instanceof THREE.PointsMaterial) {
        ref.current.material.opacity = opacity * 0.6;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#bf94ff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function MorphingCore() {
  const meshRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const vertexCount = 1500;

  // 1. Generate Geometry States
  const states = useMemo(() => {
    const geo = {
      crystal: new Float32Array(vertexCount * 3),
      neural: new Float32Array(vertexCount * 3),
      matrix: new Float32Array(vertexCount * 3),
      helix: new Float32Array(vertexCount * 3),
    };

    // Octahedron (Crystal)
    const oct = new THREE.OctahedronGeometry(2.5, 0);
    const posAttr = oct.getAttribute('position');
    for (let i = 0; i < vertexCount; i++) {
        const index = i % posAttr.count;
        geo.crystal[i * 3] = posAttr.getX(index) + (Math.random() - 0.5) * 0.1;
        geo.crystal[i * 3 + 1] = posAttr.getY(index) + (Math.random() - 0.5) * 0.1;
        geo.crystal[i * 3 + 2] = posAttr.getZ(index) + (Math.random() - 0.5) * 0.1;
    }

    // Neural Sphere
    for (let i = 0; i < vertexCount; i++) {
      const r = 2.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      geo.neural[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      geo.neural[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      geo.neural[i * 3 + 2] = r * Math.cos(phi);
    }

    // Data Cube (Matrix)
    const side = Math.floor(Math.pow(vertexCount, 1/3));
    let idx = 0;
    for (let x = 0; x < side; x++) {
      for (let y = 0; y < side; y++) {
        for (let z = 0; z < side; z++) {
          if (idx >= vertexCount) break;
          geo.matrix[idx * 3] = (x / side - 0.5) * 5;
          geo.matrix[idx * 3 + 1] = (y / side - 0.5) * 5;
          geo.matrix[idx * 3 + 2] = (z / side - 0.5) * 5;
          idx++;
        }
      }
    }

    // DNA Helix
    for (let i = 0; i < vertexCount; i++) {
      const t = (i / vertexCount) * Math.PI * 10;
      const r = 1.5;
      const spiral = i % 2 === 0 ? 1 : -1;
      geo.helix[i * 3] = r * Math.cos(t * spiral);
      geo.helix[i * 3 + 1] = (i / vertexCount - 0.5) * 8;
      geo.helix[i * 3 + 2] = r * Math.sin(t * spiral);
    }

    return geo;
  }, []);

  const currentPos = useMemo(() => new Float32Array(vertexCount * 3), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Calculate scroll progress (0 to 3 for the 4 states)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / maxScroll) * 3;
    const stateIdx = Math.floor(progress);
    const weight = progress % 1;

    // Interpolate positions
    const p1 = stateIdx === 0 ? states.crystal : stateIdx === 1 ? states.neural : stateIdx === 2 ? states.matrix : states.helix;
    const p2 = stateIdx === 0 ? states.neural : stateIdx === 1 ? states.matrix : stateIdx === 2 ? states.helix : states.helix;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < vertexCount * 3; i++) {
      positions[i] = THREE.MathUtils.lerp(p1[i], p2[i], weight);
      // Add some subtle noise/breathing
      positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.005;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate and Tilt
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x = state.pointer.y * 0.2;
    meshRef.current.rotation.z = state.pointer.x * 0.2;

    // Pulse based on bloom
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    meshRef.current.scale.setScalar(scale);

    // Fade out at the bottom
    const opacity = Math.max(0, 1 - (window.scrollY - 4000) / 1000);
    if (meshRef.current.material instanceof THREE.PointsMaterial) {
        meshRef.current.material.opacity = opacity;
    }
  });

  return (
    <group>
      <Points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={vertexCount}
            array={currentPos}
            itemSize={3}
            args={[currentPos, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#bf94ff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Ghost inner glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#7d5fff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function AetherLattice({ velocity }: { velocity: number }) {
  const meshRef = useRef<THREE.LineSegments>(null);
  const { size } = useThree();
  
  const segments = 40;
  const size_val = 150;
  
  const geometry = useMemo(() => {
    const points = [];
    const step = size_val / segments;
    
    // Vertical lines
    for (let x = -size_val/2; x <= size_val/2; x += step) {
      points.push(x, -size_val/2, 0, x, size_val/2, 0);
    }
    // Horizontal lines
    for (let y = -size_val/2; y <= size_val/2; y += step) {
      points.push(-size_val/2, y, 0, size_val/2, y, 0);
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: 0.15 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uVelocity;
      uniform vec2 uMouse;
      varying float vDist;
      
      void main() {
        vec3 pos = position;
        
        // Scroll distortion (Bending)
        float distToCenter = length(pos.xy) / 100.0;
        pos.z += uVelocity * 0.05 * sin(pos.y * 0.2 + uTime);
        pos.z += sin(pos.x * 0.1 + uTime) * (1.0 + abs(uVelocity) * 0.1);
        
        // Mouse reaction
        float mDist = distance(pos.xy, uMouse * 50.0);
        float mForce = smoothstep(15.0, 0.0, mDist);
        pos.z += mForce * 5.0;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        vDist = -mvPosition.z;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying float vDist;
      void main() {
        // Depth Fade
        float fade = smoothstep(60.0, 20.0, vDist);
        gl_FragColor = vec4(0.0, 0.96, 1.0, uOpacity * fade); // Cyan base
        
        // Subtle scanline pulse
        if (mod(vDist - uOpacity * 10.0, 10.0) < 0.1) {
          gl_FragColor += vec4(0.75, 0.58, 1.0, 0.2 * fade); // Violet accent
        }
      }
    `,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothing velocity for "Spring" feel
      mat.uniforms.uVelocity.value = THREE.MathUtils.lerp(mat.uniforms.uVelocity.value, velocity, 0.1);
      mat.uniforms.uMouse.value.lerp(state.pointer, 0.1);
      
      // Floating motion
      meshRef.current.position.z = -20 + Math.sin(state.clock.elapsedTime * 0.5) * 2;
      meshRef.current.rotation.x = -0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <lineSegments ref={meshRef} geometry={geometry} material={material} />
  );
}

function SectionHeaders() {
  const headers = [
    { text: "ABOUT PROTOCOL", y: -10 },
    { text: "COMPILED PROJECTS", y: -30 },
    { text: "TACTICAL ARSENAL", y: -50 },
    { text: "INITIATE UPLINK", y: -70 },
  ];

  return (
    <>
      {headers.map((h, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[0, h.y + (window.scrollY * 0.01), -5]}
            fontSize={1.2}
            color="#fdf0ff"
            font="https://fonts.gstatic.com/s/orbitron/v11/y97ZGS6ndY96C8UqWw.woff" // Orbitron
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
            maxWidth={10}
            textAlign="center"
          >
            {h.text}
            <meshStandardMaterial 
              emissive="#bf94ff" 
              emissiveIntensity={0.5} 
              toneMapped={false} 
            />
          </Text>
        </Float>
      ))}
    </>
  );
}
function OrbitalLights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 0.8) * 5;
      light1Ref.current.position.z = Math.cos(t * 0.8) * 5;
      light1Ref.current.intensity = 30 * Math.max(0, 1 - window.scrollY / 1000);
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.sin(t * 0.6 + Math.PI) * 4;
      light2Ref.current.position.z = Math.cos(t * 0.6 + Math.PI) * 4;
      light2Ref.current.intensity = 20 * Math.max(0, 1 - window.scrollY / 1000);
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} color="#bf94ff" intensity={30} distance={20} />
      <pointLight ref={light2Ref} color="#7d5fff" intensity={20} distance={20} />
    </>
  );
}

function SceneManager({ 
  warp, 
  singularity, 
  glitch, 
  forceGlitch = 0, 
  forceSingularity = 0, 
  ecoMode = false,
  velocity
}: { 
  warp: number, 
  singularity: number, 
  glitch: number,
  forceGlitch?: number,
  forceSingularity?: number,
  ecoMode?: boolean,
  velocity: number
}) {
  const { camera } = useThree();
  const lastSection = useRef(0);

  useEffect(() => {
    const handleWarp = (e: any) => {
      const duration = e.detail?.duration || 1.2;
      
      const tl = gsap.timeline();
      tl.to({ v: 0 }, {
        v: 1,
        duration: duration * 0.4,
        ease: "power2.in",
        // @ts-ignore
        onUpdate: function() { (window as any).setStellarWarp(this.targets()[0].v); }
      })
      .to({ fov: 45 }, {
        fov: 75,
        duration: duration * 0.4,
        ease: "power2.in",
        onUpdate: function() { 
          (camera as THREE.PerspectiveCamera).fov = this.targets()[0].fov; 
          camera.updateProjectionMatrix(); 
        }
      }, 0)
      .to({ v: 1 }, {
        v: 0,
        duration: duration * 0.6,
        ease: "power2.out",
        // @ts-ignore
        onUpdate: function() { (window as any).setStellarWarp(this.targets()[0].v); }
      })
      .to({ fov: 75 }, {
        fov: 45,
        duration: duration * 0.6,
        ease: "power2.out",
        onUpdate: function() { 
          (camera as THREE.PerspectiveCamera).fov = this.targets()[0].fov; 
          camera.updateProjectionMatrix(); 
        }
      }, duration * 0.4);
    };

    window.addEventListener('stellar-warp', handleWarp);
    return () => window.removeEventListener('stellar-warp', handleWarp);
  }, [camera]);

  return (
    <>
      <BackgroundShader />
      <ambientLight intensity={0.2} color="#bf94ff" />
      <Environment preset="night" />
      <OrbitalLights />
        <AetherEngine 
          // @ts-ignore
          uWarp={warp} 
          uSingularity={Math.max(singularity, forceSingularity)} 
        />
        <AetherLattice velocity={velocity} />
        <MorphingCore />
        <SectionHeaders />
  
        {!ecoMode && (
          <EffectComposer>
            <Bloom 
              intensity={2.0} 
              luminanceThreshold={0.1} 
              luminanceSmoothing={0.9} 
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.002 * (glitch + forceGlitch), 0.002 * (glitch + forceGlitch))}
            />
          </EffectComposer>
        )}
    </>
  );
}

export function CombinedScene({ 
  forceGlitch = 0, 
  forceSingularity = 0, 
  ecoMode = false 
}: { 
  forceGlitch?: number, 
  forceSingularity?: number, 
  ecoMode?: boolean 
}) {
  const [glitch, setGlitch] = useState(0);
  const [warp, setWarp] = useState(0);
  const [singularity, setSingularity] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(window.scrollY);
  const velocityTimeout = useRef<any>(null);

  useEffect(() => {
    (window as any).setStellarWarp = setWarp;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentScrollY / scrollHeight;
      
      // Calculate velocity (delta)
      const delta = currentScrollY - lastScrollY.current;
      setVelocity(delta);
      lastScrollY.current = currentScrollY;

      // Clear previous timeout and set a new one to decay velocity
      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
      velocityTimeout.current = setTimeout(() => {
        setVelocity(0);
      }, 50); // Faster reset for snappier feel

      // Singularity trigger at bottom 15%
      if (progress > 0.85) {
        setSingularity(THREE.MathUtils.smoothstep(progress, 0.85, 1.0));
      } else {
        setSingularity(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: false 
        }}
      >
        <Suspense fallback={null}>
          <SceneManager 
            warp={warp} 
            singularity={singularity} 
            glitch={glitch} 
            forceGlitch={forceGlitch}
            forceSingularity={forceSingularity}
            ecoMode={ecoMode}
            velocity={velocity}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
