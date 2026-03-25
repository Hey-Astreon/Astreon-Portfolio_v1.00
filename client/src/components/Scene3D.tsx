import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Tetrahedron } from '@react-three/drei';
import * as THREE from 'three';

interface RotatingShapeProps {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
  type: 'icosahedron' | 'tetrahedron';
}

function RotatingShape({ position, color, speed, scale, type }: RotatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.01;
    }
  });

  return (
    <group position={position}>
      {type === 'icosahedron' ? (
        <Icosahedron ref={meshRef} args={[1, 4]} scale={scale}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            wireframe={false}
            roughness={0.3}
            metalness={0.8}
          />
        </Icosahedron>
      ) : (
        <Tetrahedron ref={meshRef} args={[1, 0]} scale={scale}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            wireframe={false}
            roughness={0.3}
            metalness={0.8}
          />
        </Tetrahedron>
      )}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} color="#00d9ff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d9ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff006e" />
      
      <RotatingShape
        position={[-3, 0, 0]}
        color="#00d9ff"
        speed={1}
        scale={1.2}
        type="icosahedron"
      />
      <RotatingShape
        position={[3, 0, 0]}
        color="#ff006e"
        speed={0.8}
        scale={1}
        type="tetrahedron"
      />
      <RotatingShape
        position={[0, 3, -5]}
        color="#b300ff"
        speed={1.2}
        scale={0.8}
        type="icosahedron"
      />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
