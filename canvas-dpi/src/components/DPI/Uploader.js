import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { changeDpiDataUrl } from 'changedpi';

function Uploader() {
  const [imageSrc, setImageSrc] = useState('');
  const [selectedDpi, setSelectedDpi] = useState(72); // Default DPI
  const canvasRef = useRef(null);

  const dpis = [72, 150, 200, 300, 400, 600];

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });

  const deleteImage = () => {
    setImageSrc('');
  };

  const handleDownloadClick = () => {
    if (!canvasRef.current) {
      console.error('Canvas is not available.');
      return;
    }
  
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      const updatedDataUrl = changeDpiDataUrl(canvas.toDataURL('image/png'), selectedDpi);
      downloadImage(updatedDataUrl);
    };
    img.src = imageSrc;
  };
  
  const downloadImage = (dataUrl) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `image_${selectedDpi}_dpi.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <canvas ref={canvasRef} className="hidden" />
      <div {...getRootProps()} className="dropzone border-dashed border-2 h-60 border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ?
          <p>Drop the files here ...</p> :
          imageSrc ? <img src={imageSrc} alt="Preview" className="max-w-full max-h-52 mt-4" /> :
          <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <div></div>
      <div className="flex mt-4 justify-center">
        {dpis.map((dpi) => (
          <button
            key={dpi}
            onClick={() => setSelectedDpi(dpi)}
            className={`py-2 px-8 border ${selectedDpi === dpi ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500'} rounded transition-colors`}
          >
            {dpi}
          </button>
        ))}
        <input
          type="text"
          placeholder="Custom"
          className="rounded border px-4 py-2 hover:border-blue-500 hover:text-blue-500"
          value={selectedDpi}
          onChange={(e) => setSelectedDpi(Number(e.target.value))}
        />
      </div>
      <div className="mt-4">
        <button onClick={deleteImage} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete Image
        </button>
      </div>
      <div className="flex space-x-4 mt-4">
        <button onClick={handleDownloadClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download Image with New DPI
        </button>
      </div>
    </div>
  );
}

export default Uploader;
