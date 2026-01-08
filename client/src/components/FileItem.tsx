import type { TextFile } from "../context/FileCacheContext";
import { MdDownload } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import styles from "./fileitem.module.css";
import { toast } from "react-toastify";

type FileItemProps = {
  textFile: TextFile;
};

export function FileItem({ textFile }: FileItemProps) {
  const copyText = () => {
    navigator.clipboard.writeText(textFile.content);
    toast("📝 Text copied");
  };

  const downloadFile = () => {
    const blob = new Blob([textFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = textFile.date;
    a.click();

    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };
  return (
    <div className={styles["card"]}>
      <div className={styles["card-header"]}>
        <h4 className={styles["card-title"]}>{textFile.date.split("T")[0]}</h4>

        <div className={styles["card-actions"]}>
          <button onClick={() => copyText()} className={styles["actions"]}>
            <MdContentCopy />
          </button>
          <button onClick={() => downloadFile()} className={styles["actions"]}>
            <MdDownload />
          </button>
        </div>
      </div>

      <div className={styles["card-body"]}>{textFile.content}</div>
    </div>
  );
}
