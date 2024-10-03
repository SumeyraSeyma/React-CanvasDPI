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
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const scaleFactor = img.width / canvas.width;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        setDpi(Math.round(96 * scaleFactor)); // Assuming screen DPI is 96
      };
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
    <div className="p-4">
        <div {...getRootProps()} className="border-dashed border-2 border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer bg-white shadow-lg">
            <input {...getInputProps()} />
            <p className="text-gray-500">Click the button to upload or drag files to the page</p>
            {image && <img src={image} alt="Uploaded file" className="mt-4 max-w-full h-auto" />}
        </div>
        <div className="flex justify-center space-x-4 mt-4">
            {[72, 150, 200, 300, 400, 600].map(dpi => (
                <button key={dpi} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {dpi}
                </button>
            ))}
            <input placeholder='Custom' className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-2 rounded"/>
        </div>
    </div>
);
}

export default Uploader;
