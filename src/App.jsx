import React, { Suspense, useRef, useState } from "react";
import {
  GlobalCanvas,
  SmoothScrollbar,
  useScrollbar,
} from "@14islands/r3f-scroll-rig";
import { Environment, Loader, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BodyCopy, Headline, Subtitle, StickyHeadline } from "./Text";
import { mapLinear, clamp } from "three/src/math/MathUtils";
import { Image, SubImage } from "./Image";
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
      const scrollPositionY = clamp(
        mapLinear(scroll.y, 0, 1200, -20, 0),
        -20,
        0
      );
      mesh.current.position.y = scrollPositionY;
    } else {
      const scrollPositionY = clamp(
        mapLinear(scroll.y, scroll.limit - 1000, scroll.limit, 0, 20),
        0,
        20
      );
      mesh.current.position.y = scrollPositionY;
    }
  });

  return (
    <mesh ref={mesh}>
      <Plane args={[20, 20]}>
        {/* <meshStandardMaterial
          color="white"
          emissive="#7B00FF"
          flatShading={true}
        /> */}
        <meshPhysicalMaterial
          roughness="0.4"
          transmission="0.5"
          thickness="5"
        />
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
        eventPrefix="client"
        flat // disable toneMapping since we have editorial images
        camera={{ fov: 14 }}
        style={{ pointerEvents: "none", zIndex: -1 }}
      >
        {(globalChildren) => (
          <Lens>
            {enabled ? <WebGLWobbleBackground /> : <WebGLBackground />}

            <MeshPlane />

            <Suspense fallback="">
              {/* 
                Our materials use PBR ligting and requires an environment
              */}
              <Environment files="https://auguri-webflow-react.s3.sa-east-1.amazonaws.com/env/empty_warehouse_01_1k.hdr" />
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
        {/* <EffectsToggle setEnabled={setEnabled} enabled={enabled} /> */}
        <header className="container">
          <div className="headerLayout">
            <h2>
              <Headline wobble weight="lightitalic">
                Welcome to
              </Headline>
              <Headline wobble weight="medium">
                {enabled ? "TheZone" : "THE ZONE"}
              </Headline>
            </h2>
            <BodyCopy as="p" className="subline">
              Transforming Digital Marketing with Precision and Expertise
            </BodyCopy>
          </div>
        </header>
        <section className="container">
          <h3>
            <Subtitle>
              At The Zone, we specialize in performance marketing that drives
              results.
            </Subtitle>
            <em>
              <Subtitle>
                let us help your business reach its full potential.
              </Subtitle>
            </em>
          </h3>
          <p>
            <BodyCopy>
              Whether you're looking to increase brand awareness or boost
              conversions, we're here to deliver tailored solutions that fit
              your needs. We harness the latest analytics and insights to inform
              our advertising decisions, ensuring maximum ROI for your
              campaigns.
            </BodyCopy>
          </p>
        </section>
        <section className="container">
          <Image
            src="https://cdn.prod.website-files.com/673d15b531aa3707093d102a/6744ec2ba990573687c666d7_ion-fet-QRawWgV6gmo-unsplash.webp"
            className="ImageLandscape"
          />
        </section>
        <section className="ParallaxContainer">
          <StickyHeadline weight="medium">
            A Team of Specialists <br />
          </StickyHeadline>
          <SubImage
            style={{ maxHeight: "50vh", overflow: "show", left: "24%" }}
            src="https://cdn.prod.website-files.com/673d15b531aa3707093d102a/6744ac8c978e011d8afd2e5b_Jonathan%20lk%20cover%201.webp"
            className="testing"
            parallaxSpeed={1.08}
          ></SubImage>
          <BodyCopy
            style={{ position: "absolute", left: "25%", textAlign: "right" }}
          >
            Jonathan
          </BodyCopy>
          <BodyCopy
            style={{ position: "absolute", left: "25%", textAlign: "right" }}
          >
            Marketing Manager
          </BodyCopy>
          <Image
            style={{
              maxHeight: "50vh",
              overflow: "show",
              position: "absolute",
            }}
            src="https://cdn.prod.website-files.com/673d15b531aa3707093d102a/6744ac8c978e011d8afd2e5b_Jonathan%20lk%20cover%201.webp"
            className=""
            parallaxSpeed={1.08}
          />
          <BodyCopy>Jonathan - Marketing Manager</BodyCopy>
          <Image
            style={{
              maxHeight: "50vh",
              overflow: "show",
              position: "absolute",
              left: "50%",
              marginTop: "100vh",
            }}
            src="https://cdn.prod.website-files.com/673d15b531aa3707093d102a/6744ac8d0168e4f90101c21f_Rozita%20cover%20lk%201.webp"
            className=""
            parallaxSpeed={1.08}
          />
          <Image
            style={{
              maxHeight: "50vh",
              overflow: "show",
              position: "absolute",
            }}
            src="https://cdn.prod.website-files.com/673d15b531aa3707093d102a/6744ac8c219482368dc7ba13_Jamie.webp"
            className=""
            parallaxSpeed={1.08}
          />
          <Image
            style={{ maxHeight: "30vh", overflow: "show" }}
            src="https://cdn.prod.website-files.com/673d15b531aa3707093d102a/6744ac8c82d647c40024c114_Luis.webp"
            parallaxSpeed={1.2}
          />
        </section>
        <section className="container" style={{}}>
          <h4>
            <BodyCopy>
              At TheZone we like to give things a new "twist". We believe a
              fresh perspective is the key to success in a fast-paced and
              ever-evolving market
            </BodyCopy>
          </h4>
        </section>
        <section>
          <ImageCube
            src="https://cdn.prod.website-files.com/673d15b531aa3707093d102a/674565ae6b16621417b56085_Holographic_7.webp"
            className="JellyPlaceholder"
          />
        </section>
        <section className="container">
          <h3>
            <Subtitle>Most websites use a mix of WebGL and HTML.</Subtitle>
            <em>
              <Subtitle>
                However, the Lens refraction requires all images and text to be
                WebGL.
              </Subtitle>
            </em>
          </h3>
          <p>
            <a href="https://github.com/14islands/r3f-scroll-rig">
              <BodyCopy>
                You can find the r3f-scroll-rig library on Github. Please use
                WebGL responsibly™.
              </BodyCopy>
            </a>
          </p>
        </section>
        <header className="container bottom-header">
          <div className="headerLayout">
            <a href="mailto:info@thezone.ch">
              <h2>
                <Headline wobble weight="medium">
                  DROP US
                </Headline>
                <Headline wobble weight="medium">
                  A LINE
                </Headline>
              </h2>
            </a>
          </div>
        </header>
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
        innerStyles={{
          background: "white",
          width: "100vw",
          height: "10px",
          color: "black",
        }}
        barStyles={{ background: "#6e6bcd", height: "100%" }}
        dataStyles={{ color: "#c3c4c7", fontSize: "20px" }}
      />
    </div>
  );
}
