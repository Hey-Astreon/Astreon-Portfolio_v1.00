import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle Field (Cosmic Dust Nebula)
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Create 2000 points within a sphere
  const sphere = useMemo(() => {
    // Generate random positions using maath (if installed) or manual approach
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const radius = 10 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      positions[i * 3 + 2] = radius * Math.cos(phi); // z
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ff6eb4"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// Central Crystal Geometry
function CosmicCrystal() {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => new THREE.OctahedronGeometry(2.2, 0), []);
  const coreGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.2, 0), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#fdf0ff", // Pearl white base
    emissive: "#cc99ff", // Lavender emissive
    emissiveIntensity: 0.1,
    roughness: 0,
    metalness: 0.1,
    transmission: 1, // Glass-like
    thickness: 1.5,
    ior: 1.5, // Refraction index
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide
  }), []);

  const coreMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e91e8c", // Electric Rose
    emissive: "#e91e8c",
    emissiveIntensity: 0.8,
    wireframe: true,
  }), []);

  useFrame((state) => {
    if (!meshRef.current || !coreRef.current) return;
    
    // Smooth mouse parallax
    const targetX = state.pointer.y * 0.2;
    const targetY = state.pointer.x * 0.3;
    
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
    
    // Constant slow rotation for the crystal itself
    meshRef.current.rotation.z += 0.002;
    
    // Core counter-rotates
    coreRef.current.rotation.y -= 0.005;
    coreRef.current.rotation.x -= 0.003;
    
    // Camera scroll sync effect
    const scrollY = window.scrollY;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10 + scrollY * 0.01, 0.1);
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh geometry={geometry} material={glassMaterial}>
          {/* Wireframe edges for added cyber look */}
          <lineSegments>
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial color="#ff6eb4" opacity={0.3} transparent />
          </lineSegments>
        </mesh>
        
        {/* Glowing energetic core */}
        <mesh ref={coreRef} geometry={coreGeometry} material={coreMaterial} />
      </Float>
    </group>
  );
}

// Orbiting Neon Lights
function OrbitalLights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 0.8) * 5;
      light1Ref.current.position.z = Math.cos(t * 0.8) * 5;
      light1Ref.current.position.y = Math.sin(t * 0.4) * 2;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.sin(t * 0.6 + Math.PI) * 4;
      light2Ref.current.position.z = Math.cos(t * 0.6 + Math.PI) * 4;
      light2Ref.current.position.y = Math.cos(t * 0.5) * 3;
    }
  });

  return (
    <>
      {/* Electric Rose Orbiting Light */}
      <pointLight ref={light1Ref} color="#e91e8c" intensity={40} distance={20} />
      
      {/* Amethyst Violet Orbiting Light */}
      <pointLight ref={light2Ref} color="#9b59b6" intensity={30} distance={20} />
    </>
  );
}

export function Hero3DObject() {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // Optimize for high DPI screens
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} color="#cc99ff" />
        <Environment preset="night" />
        
        <OrbitalLights />
        <ParticleField />
        <CosmicCrystal />
      </Canvas>
    </div>
  );
}
