import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { changeDpiDataUrl } from 'changedpi';

function Uploader() {
  const [imageSrc, setImageSrc] = useState('');
  const [dpi, setDpi] = useState(72); // Default DPI
  const canvasRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      const updatedDataUrl = changeDpiDataUrl(canvas.toDataURL('image/png'), dpi);
      downloadImage(updatedDataUrl);
    };
  };

  const downloadImage = (dataUrl) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `image_${dpi}_dpi.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div {...getRootProps()} className="dropzone border-dashed border-2 border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ?
          <p>Drop the files here ...</p> :
          imageSrc ? <img src={imageSrc} alt="Preview" className="max-w-full max-h-60 mt-4" /> :
          <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <div className="flex space-x-2 mb-4">
        {[72, 150, 200, 300, 400, 600].map((value) => (
          <button key={value} onClick={() => setDpi(value)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {value}
          </button>
        ))}
        <input type="text" placeholder="Custom" className="form-input rounded border px-4 py-2"
               value={dpi} onChange={(e) => setDpi(e.target.value)} />
      </div>
      <button onClick={handleDownloadClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download Image with New DPI
      </button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default Uploader;
