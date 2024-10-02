import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Uploader() {
  const [image, setImage] = useState(null);
  const [dpi, setDpi] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const scaleFactor = img.width / canvas.width;
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          setDpi(Math.round(96 * scaleFactor));  // 96 is default screen DPI
        };
      }
    }
  }, [image]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Invalid file type. Please select an image file.');
      setImage(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">DPI Converter</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="text-gray-700 hover:text-gray-900">Home</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div {...getRootProps()} className="flex flex-col items-center justify-center border-2 border-dashed border-[#b0e6cb] h-96 w-full md:w-2/3 xl:w-1/2 mx-auto cursor-pointer rounded-md shadow-lg">
          <input {...getInputProps()} />
          {!image && <p>Drop file or click to select file</p>}
        </div>
        {image && <canvas ref={canvasRef} className="mt-4 max-w-full" />}
        <p className="text-center mt-2">DPI: {dpi}</p>
      </div>
    </div>
  );
}

export default Uploader;
