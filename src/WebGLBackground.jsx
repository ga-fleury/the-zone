import React, { useRef, Suspense, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Image, MeshDistortMaterial, Plane } from "@react-three/drei";
import { TextureLoader } from "three";


export function WebGLBackground() {
  const bg = useRef();
  const viewport = useThree((s) => s.viewport);
  useFrame((_, delta) => {
    // if (bg.current) bg.current.rotation.z -= delta * 0.5;
  });
  return (
    <Suspense fallback="">
      <MeshDistortMaterial speed={1.4} distort={0.14} />
      <Image
        ref={bg}
        scale={Math.max(viewport.width, viewport.height) * 1}
        url="https://cdn.prod.website-files.com/673d15b531aa3707093d102a/673d886ab820b26125017029_codrops-bg-tiny.png"
        transparent
        renderOrder={-1}
      />
    </Suspense>
  );
}

export function WebGLWobbleBackground(props) {
  const texture1 = useLoader(TextureLoader, "https://cdn.prod.website-files.com/673d15b531aa3707093d102a/674011fc90b2cf56022f87b9_holo.jpeg");

  return (
    <mesh>
      <planeGeometry args={[15,15, 65, 65]}  />
      <MeshDistortMaterial
        map={texture1}               // Texture to apply
        speed={2}                   // Speed of the wobble
        distort={0.5}               // Intensity of the distortion
      />
    </mesh>
  )
}

