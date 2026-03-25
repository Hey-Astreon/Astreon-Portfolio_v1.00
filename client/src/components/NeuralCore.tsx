import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function CoreSphere({ isStreaming }: { isStreaming: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = isStreaming ? 3 : 1;
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.2 * speed;
      pointsRef.current.rotation.z = t * 0.1 * speed;
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5 * speed;
      ring1Ref.current.rotation.y = t * 0.3 * speed;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = t * 0.4 * speed;
      ring2Ref.current.rotation.x = t * 0.2 * speed;
    }
  });

  return (
    <group>
      {/* Neural Core */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isStreaming ? "#00f5ff" : "#bf94ff"}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Orbital Data Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#4dadeb" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.1, 0.005, 16, 100]} />
        <meshBasicMaterial color="#bf94ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Central Singularity Pulse */}
      <Sphere args={[0.8, 32, 32]}>
        <meshBasicMaterial 
          color={isStreaming ? "#00f5ff" : "#bf94ff"} 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}

export function NeuralCore({ isStreaming = false, className = "" }: { isStreaming?: boolean, className?: string }) {
  return (
    <div className={`w-full h-full pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <CoreSphere isStreaming={isStreaming} />
        </Float>
      </Canvas>
    </div>
  );
}
