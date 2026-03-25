import * as THREE from 'three';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';

function NeuralImage() {
  const texture = useMemo(() => new THREE.TextureLoader().load('/roushan.png'), []);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    
    // Smooth Parallax & Scaling
    const targetX = state.pointer.x * 0.25;
    const targetY = -state.pointer.y * 0.15;
    const targetScale = hovered ? 1.1 : 1.0;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
    
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.set(s, s, s);
    glowRef.current.scale.set(s * 1.05, s * 1.05, s * 1.05);
    
    // Pulse Glow (Intensifies on hover)
    if (glowRef.current.material) {
      const pulse = 0.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * (hovered ? 2.5 : 1);
    }
  });

  return (
    <group 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      {/* 1. Underlying Vibrancy Glow (Holographic Atmosphere) */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[3.6, 4.6]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* 2. The Vibrant Clear Photo */}
      <mesh ref={meshRef}>
        <planeGeometry args={[3.5, 4.5]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          opacity={1.0} 
          toneMapped={false}
        />
      </mesh>

      {/* 3. Neural Scanline (Subtle overlay) */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[3.5, 4.5]} />
        <meshBasicMaterial 
          color="#00f5ff" 
          transparent 
          opacity={hovered ? 0.15 : 0.05} 
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

function FloatingElements() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ringRef.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
    ringRef.current.scale.set(s, s, s);
    ringRef.current.rotation.z += 0.01;
  });

  return (
    <>
      <Float speed={4} rotationIntensity={0.3} floatIntensity={0.6}>
        <NeuralImage />
      </Float>

      {/* Outer Glow Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

export function VolumetricAvatar() {
  return (
    <div className="w-full h-full relative cursor-crosshair">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} color="#00f5ff" intensity={5} />
        <FloatingElements />
      </Canvas>
    </div>
  );
}
