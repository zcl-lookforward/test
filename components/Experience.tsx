import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  Float,
  Stars,
  Sparkles
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { Tree } from './Tree';
import * as THREE from 'three';

interface ExperienceProps {
  glowColor: string;
}

const Rig = () => {
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 1 + 2, 8), 
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export const Experience: React.FC<ExperienceProps> = ({ glowColor }) => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 -z-10 bg-gradient-to-b from-gray-900 to-black">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={10} 
          castShadow 
          color="#FFD700" 
        />
        <pointLight position={[-10, -5, -10]} intensity={5} color="#004D25" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Tree glowColor={glowColor} />
          </Float>

          <ContactShadows 
            opacity={0.7} 
            scale={20} 
            blur={2} 
            far={4} 
            resolution={256} 
            color="#000000" 
          />
        </Suspense>

        <Sparkles 
          count={200} 
          scale={12} 
          size={4} 
          speed={0.4} 
          opacity={0.5} 
          color="#FFD700"
        />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Post Processing for Luxury Glow */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.5} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.6}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <Noise opacity={0.02} /> 
        </EffectComposer>

        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.8} 
        />
        {/* <Rig /> Optional: Mouse parallax rig */}
      </Canvas>
    </div>
  );
};