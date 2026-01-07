import './App.css'
import './bootstrap-offcanvas.scss';
import 'bootstrap/js/dist/offcanvas';
import { Camera } from './components/Camera';
import { Files } from './components/Files';
function App() {

  return (
    <>
      <Camera/>
      <Files/>
    </>
  )
}

export default App
