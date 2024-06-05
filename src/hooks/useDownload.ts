import React from 'react';

export const useDownload = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const download = async (qrCodeId: string, fileName: string = 'QR_code.png') => {
    setIsLoading(true);
    const canvasHTML = document.getElementById(qrCodeId) as HTMLCanvasElement;
    const qrCodeURL = canvasHTML.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = fileName;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
    setIsLoading(false);
  };

  return {
    download,
    isLoading,
  };
};
