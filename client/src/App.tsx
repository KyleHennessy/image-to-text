import "./App.css";
import "./bootstrap-offcanvas.scss";
import "bootstrap/js/dist/offcanvas";
import { Camera } from "./components/Camera";
import { Files } from "./components/Files";
import { FilesProvider } from "./context/FileCacheContext";

function App() {
  return (
    <FilesProvider>
      <Camera />
      <Files />
    </FilesProvider>
  );
}

export default App;
