import React, { useRef } from 'react'
import { ScrollScene, UseCanvas, useScrollRig, styles } from '@14islands/r3f-scroll-rig'
import { MeshDistortMaterial } from '@react-three/drei'
import { WebGLText } from '@14islands/r3f-scroll-rig/powerups'

export const Headline = ({ children, ...props }) => {
  let fontWeight;
  if (props.weight == "medium") {
    fontWeight = "https://auguri-webflow-react.s3.sa-east-1.amazonaws.com/fonts/IBMPlexSans-Medium.ttf"
  } else if (props.weight == "light") {
    fontWeight = "https://auguri-webflow-react.s3.sa-east-1.amazonaws.com/fonts/IBMPlexSans-Light.ttf"
  }

  return (
  <Text font={fontWeight} {...props}>
    {children}
  </Text>
  )
}

export const Subtitle = ({ children, ...props }) => (
  <Text font="https://auguri-webflow-react.s3.sa-east-1.amazonaws.com/fonts/JUST+Sans+Regular.otf" {...props}>
    {children}
  </Text>
)

export const BodyCopy = Text

export function Text({ children, wobble, className, font = 'https://auguri-webflow-react.s3.sa-east-1.amazonaws.com/fonts/Poppins-Regular.woff', as: Tag = 'span', ...props }) {
  const el = useRef()
  const { hasSmoothScrollbar } = useScrollRig()
  return (
    <>
      {/* 
        This is the real DOM text that we want to replace with WebGL
        `styles.transparentColorWhenSmooth` sets the text to transparent when SmoothScrollbar is enabled
        The benefit of using transparent color is that the real DOM text is still selectable
        
        display: 'block' gives a more solid calculation for spans
      */}
      <Tag ref={el} className={styles.transparentColorWhenSmooth + ' ' + className} style={{ display: 'block' }} {...props}>
        {children}
      </Tag>

      {hasSmoothScrollbar && (
        <UseCanvas debug={false} toneMapping={false} flat linear>
          <ScrollScene track={el}>
            {(props) => (
              // WebGLText is a helper component from the scroll-rig that will
              // use getComputedStyle to match font size, letter spacing and color
              <WebGLText
                el={el} // getComputedStyle is called on this element
                font={font}
                glyphGeometryDetail={16} // needed for distortion to work
                {...props} // contains scale from the ScrollScene
              >
                {wobble && <MeshDistortMaterial speed={1.4} distort={0.07}/>}
                {children}
              </WebGLText >
            )}
          </ScrollScene>
        </UseCanvas>
      )}
    </>
  )
}
