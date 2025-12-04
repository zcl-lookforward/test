import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color, Vector3 } from 'three';
import * as THREE from 'three';

interface TreeProps {
  glowColor: string;
}

const EmeraldMaterial = () => (
  <meshPhysicalMaterial
    color="#004D25"
    emissive="#001a0a"
    roughness={0.1}
    metalness={0.9}
    clearcoat={1}
    clearcoatRoughness={0.1}
    reflectivity={1}
    ior={1.5}
  />
);

const GoldMaterial = () => (
  <meshStandardMaterial
    color="#FFD700"
    roughness={0.2}
    metalness={1}
    emissive="#B8860B"
    emissiveIntensity={0.2}
  />
);

export const Tree: React.FC<TreeProps> = ({ glowColor }) => {
  const groupRef = useRef<THREE.Group>(null);
  const starRef = useRef<THREE.Mesh>(null);

  // Create layers of the tree
  const layers = useMemo(() => {
    const count = 7;
    return new Array(count).fill(0).map((_, i) => {
      const scale = 1 - (i / (count + 1));
      const y = i * 0.6;
      return { scale, y, id: i };
    });
  }, []);

  // Floating ornaments
  const ornaments = useMemo(() => {
    const items = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const height = Math.random() * 4;
      const radius = 2.5 * (1 - height / 4.5) + 0.5;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      items.push({ pos: new Vector3(x, height - 1.5, z), scale: Math.random() * 0.15 + 0.05 });
    }
    return items;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
    }
    if (starRef.current) {
      starRef.current.rotation.y = -t * 0.5;
      starRef.current.rotation.z = Math.sin(t) * 0.1;
      const scale = 1 + Math.sin(t * 3) * 0.1;
      starRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Main Tree Structure - Abstract Emerald Cones */}
      {layers.map((layer) => (
        <mesh key={layer.id} position={[0, layer.y, 0]} castShadow receiveShadow>
          <coneGeometry args={[1.5 * layer.scale, 1, 8]} />
          <EmeraldMaterial />
        </mesh>
      ))}

      {/* Internal Glow Core */}
      <pointLight position={[0, 2, 0]} intensity={2} color={glowColor} distance={5} decay={2} />

      {/* Ornaments */}
      {ornaments.map((o, i) => (
        <mesh key={i} position={o.pos} castShadow>
          <sphereGeometry args={[o.scale, 16, 16]} />
          <GoldMaterial />
        </mesh>
      ))}

      {/* Floating Gold Rings (Luxury Element) */}
      <mesh position={[0, 1, 0]} rotation={[0.2, 0, 0.1]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <GoldMaterial />
      </mesh>
      <mesh position={[0, 2.5, 0]} rotation={[-0.2, 0, -0.1]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <GoldMaterial />
      </mesh>

      {/* Top Star */}
      <mesh ref={starRef} position={[0, 4.2, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color={glowColor} />
      </mesh>
      <pointLight position={[0, 4.2, 0]} intensity={5} color={glowColor} distance={10} />
    </group>
  );
};