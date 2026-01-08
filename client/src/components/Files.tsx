import { useFiles } from "../context/FileCacheContext";
import { IoMdClose } from "react-icons/io";
import { FileItem } from "./FileItem";

import styles from "./files.module.css";

export function Files() {
  const files = useFiles().files;

  return (
    <div className="offcanvas offcanvas-start" id="files">
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasExampleLabel">
          Most Recent Images Converted To Text
        </h4>
        <IoMdClose className={styles['close-offcanvas']} data-bs-dismiss="offcanvas" />
      </div>
      <div className="offcanvas-body">
        <div className={styles["card-container"]}>
          {files.map((file, index) => (
            <FileItem key={index} textFile={file}/>
          ))}
          
        </div>
      </div>
    </div>
  );
}
