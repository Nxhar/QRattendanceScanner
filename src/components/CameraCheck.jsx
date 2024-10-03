// CameraCheck.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Image } from '@chakra-ui/react';

const CameraCheck = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Webcam
        ref={webcamRef}
        audio={false}
        height={400}
        width={600}
        videoConstraints={videoConstraints}
        style={{ border: '2px solid #3182CE', borderRadius: '10px' }}
        screenshotFormat="image/jpeg"
      />
      <Button colorScheme="teal" mt={4} onClick={capture}>
        SNAP!
      </Button>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Snapshot"
          mt={4}
          border="2px solid #3182CE"
          borderRadius="10px"
        />
      )}
    </Box>
  );
};

export default CameraCheck;
