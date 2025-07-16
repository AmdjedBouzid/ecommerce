import React, { ReactNode } from "react";
import Label from "../form/Label";
import Input from "../form/InputField";
import Button from "../button/Button";

interface AddModalProps {
  children: ReactNode;
  children2: ReactNode;
  action?: string;
  title?: string;
  description: string;
}

function AddModal({
  children,
  action,
  title,
  description,
  children2,
}: AddModalProps) {
  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 ">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          {title}
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          {description}
        </p>
      </div>
      <div className="flex flex-col">
        <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              {children}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 justify-end">
          {children2}
        </div>
      </div>
    </div>
  );
}

export default AddModal;
