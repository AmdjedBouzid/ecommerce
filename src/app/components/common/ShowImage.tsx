import React, { SetStateAction } from "react";
import XBtn from "./XBtn";

interface ShowImageProps {
  imageUrl: string;
  setShowImage: React.Dispatch<SetStateAction<boolean>>;
}

function ShowImage({ imageUrl, setShowImage }: ShowImageProps) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center"
      onClick={() => setShowImage(false)}
    >
      <button
        aria-label="Close image"
        className="absolute top-4 right-4 z-[100] bg-white dark:bg-gray-800 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700"
        onClick={(e) => {
          e.stopPropagation();
          setShowImage(false);
        }}
      >
        <XBtn />
      </button>

      <img
        src={imageUrl}
        alt="Preview"
        className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent image click from closing modal
      />
    </div>
  );
}

export default ShowImage;
