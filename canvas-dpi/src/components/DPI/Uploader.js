import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { changeDpiDataUrl } from 'changedpi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';

function Uploader() {
  const [imageSrc, setImageSrc] = useState('');
  const [selectedDpi, setSelectedDpi] = useState('');
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
    <div className="p-4 bg-white shadow justify-center rounded-lg w-9/12 mt-6">
       <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div>
    <div {...getRootProps()} className="dropzone border-dashed border-2 h-60 border-gray-400 rounded-lg p-16 flex flex-col items-center justify-center cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive ?
        <p>Drop the files here ...</p> :
        imageSrc ? <img src={imageSrc} alt="Preview" className="max-w-full max-h-48 mt-4" /> :
        <div>
          <img src="https://www.dpi-converter.com/assets/images/file-upload.png" alt="Placeholder" className="max-w-full max-h-48 mt-4" />
          <p className='mt-4 mb-4'>Drag 'n' drop some files here, or click to select files</p>
        </div>
      }
    </div>
    <div className='flex justify-between'>
    <div className="flex mt-4 justify-center ">
      {dpis.map((dpi) => (
        <button
          key={dpi}
          onClick={() => setSelectedDpi(dpi)}
          className={` w-20 border  ${selectedDpi === dpi ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500'}  transition-colors`}
        >
          {dpi}
        </button>
      ))}
      <input
        type="text"
        placeholder="Custom"
        className="w-24 border border-gray-300 px-4 py-2 hover:border-blue-500 hover:text-blue-500"
        value={selectedDpi}
        onChange={(e) => setSelectedDpi(Number(e.target.value))}
      />
    </div>
    <div className='flex'>
    <div className="mt-4">
      <button onClick={deleteImage} className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      <FontAwesomeIcon className='' icon={faTrashCan} />
      </button>
    </div>
    <div className="flex space-x-4 mt-4">
      <button onClick={handleDownloadClick} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      <FontAwesomeIcon icon={faCloudArrowDown} />
      </button>
    </div>
    </div>
    </div>
    </div>
  </div>
  );
}

export default Uploader;
