import React from "react";
import { assets } from "../../../../public/assets/assets";
interface ProfileImgProps {
  path: string | null;
}
function ProfileImg({ path }: ProfileImgProps) {
  return (
    <div className="h-[48px] w-[48px] bg-white dark:bg-gray-800 rounded-full flex justify-center items-center border-2 border-white dark:border-gray-700 shadow-md overflow-hidden">
      <img
        src={path ? path : assets.defaultUserImg.src}
        alt="profile image"
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );
}

export default ProfileImg;
