// eslint-disable-next-line import/no-extraneous-dependencies
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { Button } from '@mui/base';


export default function CameraCapture({sendImage}) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capturePhoto = async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    sendImage(imageSrc);
  };

  return (
    <div>
      {capturedImage ? (
        <img src={capturedImage} alt="Capture" />
      ) : (
        <Webcam audio={false} ref={webcamRef} />
      )}
      <Button onClick={capturePhoto}>Capture Photo</Button>
    </div>
  );
}

CameraCapture.propTypes = {
  sendImage: PropTypes.func,
};
