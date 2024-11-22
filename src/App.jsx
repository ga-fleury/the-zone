import React, { Suspense, useRef, useState } from "react";
import { GlobalCanvas, SmoothScrollbar, useScrollbar } from "@14islands/r3f-scroll-rig";
import { Environment, Loader, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BodyCopy, Headline, Subtitle } from "./Text";
import { mapLinear, clamp } from "three/src/math/MathUtils";
import { Image } from "./Image";
import { ImageCube } from "./ImageCube";
import { WebGLBackground, WebGLWobbleBackground } from "./WebGLBackground";
import { Lens } from "./Lens";
import CodropsFrame from "./CodropsFrame";
import EffectsToggle from "./EffectsToggle";

import "@14islands/r3f-scroll-rig/css";

function MeshPlane(props) {
  const mesh = useRef();
  const { scroll } = useScrollbar();

  useFrame((_, delta) => {
    if (scroll.y < scroll.limit / 2) {
      const scrollPositionY = clamp(mapLinear(scroll.y, 0, 1200, -20, 0), -20, 0);
      mesh.current.position.y = scrollPositionY;
    } else {
      const scrollPositionY = clamp(mapLinear(scroll.y, scroll.limit - 1200, scroll.limit, 0, 20), 0, 20);
      mesh.current.position.y = scrollPositionY;
    }
  });

  return (
    <mesh ref={mesh}>
      <Plane args={[20, 20]}>
        <meshStandardMaterial color="white" emissive="#7B00FF" flatShading={true}/>
      </Plane>
    </mesh>
  );
}

// Photos by <a href="https://unsplash.com/@maxberg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maxim Berg</a> on <a href="https://unsplash.com/photos/u8maxDvbae8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

export default function App() {
  const eventSource = useRef();
  const [enabled, setEnabled] = useState(true);

  return (
    // We attach events onparent div in order to get events on both canvas and DOM
    <div ref={eventSource}>
      <CodropsFrame />
      <GlobalCanvas
        // shader errors are hidden by default which speeds up compilation
        debug={false}
        // scaleMultiplier is a scroll-rig setting to scale the entire scene
        scaleMultiplier={0.01}
        // All other props on the R3F Canvas is supported:
        eventSource={eventSource}
        eventPrefix='client'
        flat // disable toneMapping since we have editorial images
        camera={{ fov: 14 }}
        style={{ pointerEvents: "none", zIndex: -1 }}
      >
        {globalChildren => (
          <Lens>
            {enabled ? <WebGLWobbleBackground /> : <WebGLBackground />}

            <MeshPlane />

            <Suspense fallback=''>
              {/* 
                Our materials use PBR ligting and requires an environment
              */}
              <Environment files='https://auguri-webflow-react.s3.sa-east-1.amazonaws.com/env/empty_warehouse_01_1k.hdr' />
              {globalChildren}
            </Suspense>
          </Lens>
        )}
      </GlobalCanvas>
      <SmoothScrollbar
        enabled={enabled}
        config={{ syncTouch: true }} // Lenis setting to force smooth scroll on touch devices
      />
      <article>
        <EffectsToggle setEnabled={setEnabled} enabled={enabled} />
        <header className='container'>
          <div className='headerLayout'>
            <h2>
              <Headline wobble weight='light'>
                WELCOME TO
              </Headline>
              <Headline wobble weight='medium'>
                {enabled ? "THE ZONE" : "THE ZONE"}
              </Headline>
            </h2>
            <BodyCopy as='p' className='subline'>
              Transforming Your Digital Marketing with Precision and Expertise
            </BodyCopy>
          </div>
        </header>
        <section className='container'>
          <h3>
            <Subtitle>We use CSS to create a responsive layout.</Subtitle>
            <em>
              <Subtitle>A Canvas on top tracks DOM elements and enhance them with WebGL.</Subtitle>
            </em>
          </h3>
          <p>
            <BodyCopy>
              Try turning off WebGL using the button in the sticky header. You’ll notice smooth scrolling is disabled, and all scroll-bound
              WebGL effects disappears.
            </BodyCopy>
          </p>
        </section>
        <section className=''>
          <Image
            src='https://cdn.prod.website-files.com/673d15b531aa3707093d102a/673d886ab78a48c06e5735a1_maxim-berg-1_U2RcHnSjc-unsplash.jpg'
            className='ImageLandscape'
          />
        </section>
        <section className='ParallaxContainer'>
          <Image
            src='https://cdn.prod.website-files.com/673d15b531aa3707093d102a/673d886bd7c5130cebe3687f_maxim-berg-qsDfqZyTCAE-unsplash-crop.jpg'
            className='aspect-9_13'
            parallaxSpeed={1.08}
          />
          <Image
            src='https://cdn.prod.website-files.com/673d15b531aa3707093d102a/673d886bce54620949649596_maxim-berg-ANuuRuCRRAc-unsplash.jpg'
            className='aspect-16_11'
            parallaxSpeed={0.92}
          />
        </section>
        <section className='container'>
          <h4>
            <BodyCopy>
              Thanks to Threejs we can also render 3D geometry or models. The following image is replaced by a box. Try scrolling hard to
              make it wiggle.
            </BodyCopy>
          </h4>
        </section>
        <section>
          <ImageCube
            src='https://cdn.prod.website-files.com/673d15b531aa3707093d102a/673d886a4a269f8ac742b999_maxim-berg-TcE45yIzJA0-unsplash.jpg'
            className='JellyPlaceholder'
          />
        </section>
        <section className='container'>
          <h3>
            <Subtitle>Most websites use a mix of WebGL and HTML.</Subtitle>
            <em>
              <Subtitle>However, the Lens refraction requires all images and text to be WebGL.</Subtitle>
            </em>
          </h3>
          <p>
            <a href='https://github.com/14islands/r3f-scroll-rig'>
              <BodyCopy>You can find the r3f-scroll-rig library on Github. Please use WebGL responsibly™.</BodyCopy>
            </a>
          </p>
        </section>
        <footer>
          <CodropsFrame />
        </footer>
      </article>

      <Loader
        containerStyles={{
          background: "white",
          top: "0",
          bottom: 0,
          height: "100vh",
          position: "fixed",
        }}
        innerStyles={{ background: "white", width: "100vw", height: "10px", color: "black" }}
        barStyles={{ background: "#6e6bcd", height: "100%" }}
        dataStyles={{ color: "#c3c4c7", fontSize: "20px" }}
      />
    </div>
  );
}
