import { useEffect } from "react";
import { useFiles } from "../context/FileCacheContext";
import { IoMdClose } from "react-icons/io";

export function Files() {
  const files = useFiles().files;

  return (
    <div className="offcanvas offcanvas-start" id="files">
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasExampleLabel">
          Most Recent Images Converted To Text
        </h4>
        

          <IoMdClose className="close-offcanvas" data-bs-dismiss="offcanvas"  />
        
      </div>
      <div className="offcanvas-body"></div>
    </div>
  );
}
