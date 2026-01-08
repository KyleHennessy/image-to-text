import type { TextFile } from "../context/FileCacheContext";
import { MdDownload } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import styles from './fileitem.module.css';

type FileItemProps = {
  textFile: TextFile;
};

export function FileItem({ textFile }: FileItemProps) {
  return (
    <div className={styles["card"]}>
      <div className={styles["card-header"]}>
        <h4 className={styles["card-title"]}>{textFile.date.split("T")[0]}</h4>

        <div className={styles["card-actions"]}>
          <button className={styles["actions"]}>
            <MdContentCopy />
          </button>
          <button className={styles["actions"]}>
            <MdDownload />
          </button>
        </div>
      </div>

      <div className={styles["card-body"]}>{textFile.content}</div>
    </div>
  );
}
