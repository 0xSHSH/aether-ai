import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders/dither';

// Augment global JSX namespace to include React Three Fiber elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      icosahedronGeometry: any;
      shaderMaterial: any;
    }
  }
}

const HeroModel: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uLightPos: { value: new THREE.Vector3(5, 5, 5) },
      // Updated colors for "Red/Black" theme
      uColorPrimary: { value: new THREE.Color('#ef4444') }, // Neon Red
      uColorSecondary: { value: new THREE.Color('#000000') }, // Pure Black
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Update resolution dynamically based on R3F state size to ensure responsiveness
      const { width, height } = state.size;
      if (
        materialRef.current.uniforms.uResolution.value.x !== width ||
        materialRef.current.uniforms.uResolution.value.y !== height
      ) {
         materialRef.current.uniforms.uResolution.value.set(width, height);
      }
      
      // Dynamic light movement
      const time = state.clock.getElapsedTime();
      materialRef.current.uniforms.uLightPos.value.x = Math.sin(time) * 10;
      materialRef.current.uniforms.uLightPos.value.z = Math.cos(time) * 10;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* High segment count for smooth vertex displacement */}
      <icosahedronGeometry args={[2.2, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default HeroModel;