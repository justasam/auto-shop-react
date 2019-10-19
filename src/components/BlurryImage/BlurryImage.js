import React from 'react';

const BlurryImage = ({src, width='100%', children}) => {
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
        filter: 'blur(6px) brightness(70%)',
        zIndex: -1
      }}/>
      {children}
    </div>
  )
}

export default BlurryImage;