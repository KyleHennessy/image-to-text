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

  async function analyzeImage(){
    const url = 'https://ai-sandbox-functions.azurewebsites.net/api/convertImageToTextHttpTrigger';

    const blob = await(await fetch(image)).blob();
    
    const response = await fetch(url, {
      method: 'POST',
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/octet-stream'
      },
      body: blob
    });

    const json = await response.json();

    if(!response.ok){
      alert(json.error);
      return;
    }

    alert(json.text);
  }

  return (
    <>
      <div className={styles["webcam-container"]}>
        {!image ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className={styles.webcam}
            disablePictureInPicture={true}
          />
        ) : (
          <>
            <div className={styles.actions}>
              <button onClick={() => analyzeImage()}>Accept</button>
              <button onClick={() => setImage('')}>Cancel</button>
            </div>
            <img className={styles.image} src={image} />
          </>
        )}
      </div>

      <div className={styles.dock}>
        <button>files</button>
        <button onClick={() => onCapture()}>capture</button>
        <button>upload</button>
      </div>
    </>
  );
}
