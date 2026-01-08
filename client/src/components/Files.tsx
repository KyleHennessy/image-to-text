import { useEffect } from "react";
import { useFiles } from "../context/FileCacheContext";

export function Files() {
  const {files, setFiles} = useFiles();

  useEffect(() => {
    console.log('files updated');
    console.log(files);
  }, [files]);
  return (
    <div
      className="offcanvas offcanvas-start"
      id="files"
    >
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasExampleLabel">
          Most Recent Images Converted To Text
        </h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        
      </div>
    </div>
  );
}
