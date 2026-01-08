import Webcam from "react-webcam";
import styles from "./camera.module.css";
import { useCallback, useRef, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import { MdTextSnippet } from "react-icons/md";
import { MdUpload } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";
import { useFiles, type TextFile } from "../context/FileCacheContext";

export function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const { files, setFiles } = useFiles();

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const onCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc ?? "");
  }, [webcamRef, setImage]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      setImage(base64String);
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const handleUploadClick = () => {
    fileInput.current?.click();
  };

  async function analyzeImage() {
    setUploading(true);
    const url =
      "https://ai-sandbox-functions.azurewebsites.net/api/convertImageToTextHttpTrigger";

    const blob = await (await fetch(image)).blob();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/octet-stream",
      },
      body: blob,
    });

    const json = await response.json();

    setUploading(false);
    setImage("");

    if (!response.ok) {
      alert(json.error);
      return;
    }

    const newFile: TextFile = {
      date: new Date().toISOString(),
      content: json.text,
    };

    const updatedFiles = [...files];

    updatedFiles.push(newFile);

    //only show 5 most recent images converted to text. Remove the rest
    while (updatedFiles.length > 5) {
      updatedFiles.shift();
    }

    console.log(updatedFiles);

    setFiles(updatedFiles);
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
              {uploading && <CgSpinner className={styles.spinner} />}
              {!uploading && (
                <>
                  <button
                    type="button"
                    className={`${styles["check-button"]} ${styles["rounded-button"]}`}
                    onClick={() => analyzeImage()}
                  >
                    <IoMdCheckmark />
                  </button>
                  <button
                    type="button"
                    className={`${styles["cancel-button"]} ${styles["rounded-button"]}`}
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
      {!image && (
        <div
          className={styles.dock}
          style={{ display: image !== "" ? "none" : "auto" }}
        >
          <button
            type="button"
            className={styles.button}
            data-bs-toggle="offcanvas"
            data-bs-target="#files"
            aria-controls="files"
          >
            <MdTextSnippet />
          </button>
          <button
            type="button"
            className={`${styles["camera-button"]} ${styles["rounded-button"]}`}
            onClick={() => onCapture()}
          >
            <MdOutlineCameraAlt />
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => handleUploadClick()}
          >
            <MdUpload />
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={(event) => handleFileSelect(event)}
      />
    </>
  );
}
