import Webcam from "react-webcam";
import styles from "./camera.module.css";
import { useCallback, useRef, useState } from "react";

export function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState("");

  const onCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc ?? "");
  }, [webcamRef, setImage]);

  return (
    <>
    <div className={styles['webcam-container']}>
      {!image ? (
        <Webcam 
            audio={false} 
            ref={webcamRef} 
            screenshotFormat="image/jpeg" 
            className={styles.webcam}
            />
      ) : (
        <img src={image}/>
      )}
    </div>

      <div className={styles.dock}>
        <button>files</button>
        <button onClick={() => onCapture()}>scan</button>
        <button>upload</button>
      </div>
    </>
  );
}
