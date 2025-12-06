import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import HeroModel from './HeroModel';
import { EffectComposer, Noise, Vignette, Scanline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const Scene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        
        <Suspense fallback={null}>
            <HeroModel />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5} 
          autoRotate={false}
        />

        {/* Post Processing for extra "Retro/Cyber" feel */}
        <EffectComposer>
          <Noise opacity={0.15} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <Scanline density={1.5} opacity={0.05} /> 
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene;