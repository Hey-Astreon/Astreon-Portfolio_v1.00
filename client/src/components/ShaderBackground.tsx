import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform float uScrollY;

#define PI 3.14159265359

// Smooth noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
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
  
  // Create an animated aurora-like flow
  float t = uTime * 0.2;
  float scrollOffset = uScrollY * 0.001;
  
  // Add some distortion based on noise
  vec2 st = uv;
  st.y += scrollOffset;
  
  float n1 = snoise(vec2(st.x * 3.0, st.y * 2.0 - t));
  float n2 = snoise(vec2(st.x * 5.0 + t, st.y * 4.0 - t * 1.5));
  float n3 = snoise(vec2(st.x * 2.0 - t, st.y * 6.0 + t * 0.5));
  
  float noise = n1 * 0.5 + n2 * 0.25 + n3 * 0.125;
  
  // Map noise to colors
  // Stellar Void: Absolute Black, Celestial Cyan, Electric Violet
  vec3 absoluteBlack = vec3(0.0, 0.0, 0.0);
  vec3 celestialCyan = vec3(0.0, 0.96, 1.0); // #00f5ff
  vec3 electricViolet = vec3(0.75, 0.58, 1.0); // #bf94ff
  
  vec3 color = absoluteBlack;
  
  // Layer the colors based on noise thresholds
  float f1 = smoothstep(-0.2, 0.8, noise);
  float f2 = smoothstep(0.2, 1.0, noise);
  float f3 = smoothstep(0.6, 1.2, noise);
  
  color = mix(color, electricViolet, f1 * 0.15); // Deep base aurora
  color = mix(color, celestialCyan, f2 * 0.1); // Cyan highlights
  color = mix(color, electricViolet, f3 * 0.05); // Violet super-highlights
  
  // Scanlines
  float scanline = sin(uv.y * uResolution.y * 0.5) * 0.02;
  color -= scanline;
  
  // Vignette
  float dist = distance(uv, vec2(0.5));
  color *= smoothstep(0.8, 0.2, dist * 0.8);

  gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uScrollY: { value: 0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScrollY.value = window.scrollY;
      
      // Update resolution on resize
      materialRef.current.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
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

export function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 1] }} // Ortho-like setup for a full screen plane
        gl={{ antialias: false }} // Less expensive
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
