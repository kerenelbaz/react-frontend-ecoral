import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { Button } from '@mui/base';

export default function CameraCapture({ sendImage }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then((res) => res.blob());
    setCapturedImage(blob);
    sendImage(blob); // Sending the Blob directly to the parent component
  };

  return (
    <div>
      {capturedImage ? (
        <img src={URL.createObjectURL(capturedImage)} alt="Capture" />
      ) : (
        <Webcam audio={false} ref={webcamRef} />
      )}
      <Button onClick={capturePhoto}>Capture Photo</Button>
    </div>
  );
}

CameraCapture.propTypes = {
  sendImage: PropTypes.func.isRequired,
};
