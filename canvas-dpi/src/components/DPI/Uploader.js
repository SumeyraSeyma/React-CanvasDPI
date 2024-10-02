import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Uploader() {
  const [dpi, setDpi] = useState(0);
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDownDisabled, setIsDownDisabled] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = () => {
          const dpi = Math.round(img.width / canvas.width);
          setDpi(dpi);
          ctx.drawImage(img, 0, 0, img.width / dpi, img.height / dpi);
        };
      }
    }
  }, [image]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
          setFileName(file.name);
          setIsDisabled(true);
          setIsDownDisabled(true);

          toast.success('Image uploaded successfully!', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Invalid file type. Please select an image file.', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setFileName('No selected file');
        setIsDisabled(false);
        setImage(null);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
      <div>
         
    <header id="header" className="bg-white shadow-md py-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:w-auto text-center lg:text-left">
            <div className="logo">
              <a href="/" className="text-2xl font-bold text-gray-800">
                DPI Converter
              </a>
            </div>
          </div>
          <ul className="flex space-x-4 mt-4 lg:mt-0">
            <li>
              <a href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
      

    <div>
      <div {...getRootProps()} className="flex flex-col items-center justify-center border-2 border-dashed border-[#b0e6cb] h-[380px] w-[800px] cursor-pointer rounded-md mt-0 shadow-lg">
            <input {...getInputProps()} />        
        {image ?(
        <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ):(
        <>
            <p className='droppp'>Drop file or click select file</p>
        </>
        )}
        
        </div>
      <canvas ref={canvasRef}></canvas>
      <p>{dpi}</p>
    </div>
    </div>
  );
}

export default Uploader;
