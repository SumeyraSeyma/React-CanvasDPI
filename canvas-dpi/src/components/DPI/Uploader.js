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
      <h1>Drop your image here</h1>
      <div {...getRootProps()} style={{ border: '1px solid black', width: 200, height: 200 }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <canvas ref={canvasRef}></canvas>
      <p>{dpi}</p>
    </div>
  );
}

export default Uploader;
