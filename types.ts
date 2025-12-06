import * as THREE from 'three';

export interface DitherUniforms {
  uTime: { value: number };
  uResolution: { value: THREE.Vector2 };
  uLightPos: { value: THREE.Vector3 };
  uColorPrimary: { value: THREE.Color };
  uColorSecondary: { value: THREE.Color };
}

export type SectionType = 'hero' | 'about' | 'technology' | 'contact';