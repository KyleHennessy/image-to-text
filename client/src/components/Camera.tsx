import Webcam from "react-webcam";
import styles from "./camera.module.css";
import { useCallback, useRef, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import { MdTextSnippet } from "react-icons/md";
import { MdUpload } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";

export function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const onCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc ?? '');
  }, [webcamRef, setImage]);

  async function analyzeImage() {
    setUploading(true);
    const url =
      'https://ai-sandbox-functions.azurewebsites.net/api/convertImageToTextHttpTrigger';

    const blob = await (await fetch(image)).blob();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/octet-stream',
      },
      body: blob,
    });

    const json = await response.json();

    setUploading(false);
    setImage('');

    if (!response.ok) {
      alert(json.error);
      return;
    }

    alert(json.text);
  }

  return (
    <>
      <div className={styles['webcam-container']}>
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
              {uploading && <CgSpinner className={styles.spinner} />}
              {!uploading && (
                <>
                  <button
                    className={`${styles['check-button']} ${styles['rounded-button']}`}
                    onClick={() => analyzeImage()}
                  >
                    <IoMdCheckmark />
                  </button>
                  <button
                    className={`${styles['cancel-button']} ${styles['rounded-button']}`}
                    onClick={() => setImage("")}
                  >
                    <IoMdClose />
                  </button>
                </>
              )}
            </div>
            <img className={styles.image} src={image} />
          </>
        )}
      </div>

      <div className={styles.dock}>
        <button>
          <MdTextSnippet />
        </button>
        <button
          className={`${styles["camera-button"]} ${styles["rounded-button"]}`}
          onClick={() => onCapture()}
        >
          <MdOutlineCameraAlt />
        </button>
        <button>
          <MdUpload />
        </button>
      </div>
    </>
  );
}
