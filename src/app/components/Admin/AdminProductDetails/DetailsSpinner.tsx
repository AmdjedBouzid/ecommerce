import React from "react";

function DetailsSpinner() {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default DetailsSpinner;
