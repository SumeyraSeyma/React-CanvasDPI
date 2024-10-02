import { ToastContainer } from 'react-toastify';
import './App.css';
import Uploader from './components/DPI/Uploader';
import './output.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <Uploader />
      <ToastContainer />
      
    </div>
  );
}

export default App;
