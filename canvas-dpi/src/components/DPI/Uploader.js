import React, { useState, useRef } from 'react';
import { changeDpiDataUrl } from 'changedpi';

function ImageUploader() {
  const [imageSrc, setImageSrc] = useState('');
  const [dpi, setDpi] = useState(72); // Varsayılan olarak 72 DPI
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

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
    <div>
      <input type="file" onChange={handleImageChange} />
      <input type="number" value={dpi} onChange={(e) => setDpi(e.target.value)} />
      <button onClick={handleDownloadClick}>Download Image with New DPI</button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default ImageUploader;
