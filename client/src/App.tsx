import "./App.css";
import "./bootstrap-offcanvas.scss";
import "bootstrap/js/dist/offcanvas";
import { Camera } from "./components/Camera";
import { Files } from "./components/Files";
import { FilesProvider } from "./context/FileCacheContext";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <FilesProvider>
      <Camera />
      <Files />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
    </FilesProvider>
  );
}

export default App;
