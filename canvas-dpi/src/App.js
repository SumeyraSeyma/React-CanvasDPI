import { ToastContainer } from 'react-toastify';
import './App.css';
import Uploader from './components/DPI/Uploader';
import './output.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="bg-blue-100 min-h-screen">
      <header className="bg-blue-500 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl">Online DPI Converter</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/" className="hover:underline">English ▼</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container mx-auto mt-0">
        <Uploader />
      </div>
    </div>
  );
}

export default App;
