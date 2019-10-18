import React from 'react';

const BlurryImage = ({src, width='100vw'}) => {
  return (
    <div style={{
      position: 'relative',
      margin: 0,
      padding: 0,
    }}>
      <img src={src} alt="regular" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: '100%',
        zIndex: -2
      }} />
      <img src={src} alt="blurred" style={{
        position: 'relative',
        width: width,
        filter: 'blur(6px) brightness(90%)',
        zIndex: -1
      }}/>
    </div>
  )
}

export default BlurryImage;