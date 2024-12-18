export const compressAndResizeImage = (
  file,
  targetWidth = 200,
  quality = 1.0
) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        // Define the aspect ratio
        const aspectRatio = img.height / img.width;

        // Set higher resolution canvas (e.g., 2x the target size)
        const highResWidth = targetWidth * 2;
        const highResHeight = highResWidth * aspectRatio;

        const highResCanvas = document.createElement('canvas');
        highResCanvas.width = highResWidth;
        highResCanvas.height = highResHeight;

        // Draw the image on the high-res canvas
        const highResCtx = highResCanvas.getContext('2d');
        highResCtx.imageSmoothingEnabled = true;
        highResCtx.imageSmoothingQuality = 'high';
        highResCtx.drawImage(img, 0, 0, highResWidth, highResHeight);

        // Downscale to target dimensions
        const targetCanvas = document.createElement('canvas');
        targetCanvas.width = targetWidth;
        targetCanvas.height = targetWidth * aspectRatio;

        const targetCtx = targetCanvas.getContext('2d');
        targetCtx.imageSmoothingEnabled = true;
        targetCtx.imageSmoothingQuality = 'high';
        targetCtx.drawImage(
          highResCanvas,
          0,
          0,
          highResWidth,
          highResHeight,
          0,
          0,
          targetWidth,
          targetCanvas.height
        );

        // Export the final image
        const compressedBase64 = targetCanvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = () => reject(new Error('Failed to load the image.'));
    };

    reader.onerror = () => reject(new Error('Failed to read the file.'));
    reader.readAsDataURL(file);
  });
};
