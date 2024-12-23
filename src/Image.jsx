import React, { useRef, Suspense, Children } from "react";
import {
  UseCanvas,
  useScrollRig,
  useImageAsTexture,
  styles,
} from "@14islands/r3f-scroll-rig";
import { ParallaxScrollScene } from "@14islands/r3f-scroll-rig/powerups";
import { Image as DreiImage, Circle } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { clamp } from "three/src/math/MathUtils";
import { DoubleSide } from "three";
import { MeshDistortMaterial } from "@react-three/drei";
import { WebGLText } from "@14islands/r3f-scroll-rig/powerups";

export function Image({ src, parallaxSpeed = 1, ...props }) {
  const el = useRef();
  const img = useRef();
  const { hasSmoothScrollbar } = useScrollRig();
  return (
    <>
      <div ref={el} {...props}>
        <img
          className={styles.hiddenWhenSmooth}
          ref={img}
          src={src}
          loading="eager"
          decode="async"
          alt="This will be loaded as a texture"
        />
      </div>

      {hasSmoothScrollbar && (
        <UseCanvas debug={false}>
          <ParallaxScrollScene track={el} speed={parallaxSpeed}>
            {(props) => (
              <Suspense fallback={<LoadingIndicator {...props} />}>
                <WebGLImage imgRef={img} {...props} />
              </Suspense>
            )}
          </ParallaxScrollScene>
        </UseCanvas>
      )}
    </>
  );
}

export function SubImage({ className, children, src, parallaxSpeed = 1, ...props }) {
  const el = useRef();
  const img = useRef();
  const { hasSmoothScrollbar } = useScrollRig();
  return (
    <>
      <div ref={el} {...props}>
        <img
          className={styles.hiddenWhenSmooth}
          ref={img}
          src={src}
          loading="eager"
          decode="async"
          alt="This will be loaded as a texture"
        />
        <span
        className={styles.transparentColorWhenSmooth + " " + className}
        {...props}
        >
          {children}
        </span>
      </div>
      <div className="subimage">
        {hasSmoothScrollbar && (
          <>
            <UseCanvas debug={false}>
              <ParallaxScrollScene track={el} speed={parallaxSpeed}>
                {(props) => (
                  <>
                    <Suspense fallback={<LoadingIndicator {...props} />}>
                      <WebGLImage imgRef={img} {...props} />
                    </Suspense>
                    <WebGLText
                      el={el} // getComputedStyle is called on this element
                      font="https://auguri-webflow-react.s3.sa-east-1.amazonaws.com/fonts/Poppins-Regular.woff"
                      glyphGeometryDetail={16} // needed for distortion to work
                      {...props} // contains scale from the ScrollScene
                    >
                      <MeshDistortMaterial speed={1.4} distort={0.1} />
                      {children}
                    </WebGLText>
                  </>
                )}
              </ParallaxScrollScene>
            </UseCanvas>
          </>
        )}
      </div>
    </>
  );
}

function WebGLImage({ imgRef, scrollState, dir, ...props }) {
  const ref = useRef();

  // Load texture from the <img/> and suspend until it's ready
  const texture = useImageAsTexture(imgRef);

  useFrame(({ clock }) => {
    // scrollState.visibility is 0 when image enters viewport at bottom and 1 when image is fully visible
    ref.current.material.grayscale = clamp(
      1 - scrollState.visibility ** 3,
      0,
      1
    );
    // scrollState.progress is 0 when image enters viewport at bottom and 1 when image left the viewport at the top
    // ref.current.material.zoom = 1 + scrollState.progress * 0.66;
    // scrollState.viewport is 0 when image enters viewport at bottom and 1 when image reached top of viewport
    ref.current.material.opacity = clamp(scrollState.viewport * 3, 0, 1);
  });

  // Use the <Image/> component from Drei
  return <DreiImage ref={ref} texture={texture} transparent {...props} />;
}

function LoadingIndicator({ scale }) {
  const box = useRef();
  useFrame(({ clock }) => {
    box.current.rotation.y = clock.getElapsedTime() * 5;
  });
  return (
    <group scale={scale.xy.times(0.05).min()}>
      <Circle ref={box}>
        <meshNormalMaterial side={DoubleSide} />
      </Circle>
      <Circle>
        <meshNormalMaterial side={DoubleSide} />
      </Circle>
    </group>
  );
}
