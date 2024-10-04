import { ToastContainer } from 'react-toastify';
import './App.css';
import Uploader from './components/DPI/Uploader';
import './output.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className='bg-blue-500 p-4' id='Aa'>
        <header className="text-white 2xl:flex justify-between text-center py-4 w-full" >
          <h1 className="text-2xl">Online DPI Converter</h1>
          <nav>
            <ul className="flex justify-center space-x-4 mt-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/" className="hover:underline">English ▼</a></li>
            </ul>
          </nav>
        </header>
      </div>
    <div className="flex-1 bg-blue-500 flex items-end justify-center">
    </div>
    <div className="flex-1 bg-white flex items-start justify-center">
      <div className="w-full max-w-7xl px-4 2xl:ml-64 2xl:-mt-44">
          <p className="text-3xl 2xl:mt-16 2xl:ml-80 text-white" id='p1'>Online DPI Converter</p>
            <p className='text-center text-white mr-72' id='p2'>Batch modify DPI of images, supports various formats such as JPG, PNG, GIF, etc.</p> 
        <ToastContainer />
        <Uploader />
      </div>
    </div>
  </div>
  );
}

export default App;
