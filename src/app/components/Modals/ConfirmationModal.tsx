//import { useTheme } from "../../../context/ThemeContext";
import Button from "../button/Button";
import Loader from "@/app/components/common/Loader";
import { useState } from "react";

interface ConfirmationModalProps {
  text: string;
  okText: string | React.ReactNode;
  cancelText: string | React.ReactNode;
  okColor?: string;
  cancelColor?: string;
  onOk: (id: number) => void;
  onCancel: () => void;
  classNameOkButton?: string;
  classNameNoButton?: string;
  confirmationItemId?: number;
  action: string;
}

export default function ConfirmationModal({
  text,
  okText,
  cancelText,
  confirmationItemId = -1,
  onOk,
  onCancel,
  classNameOkButton = "",
  classNameNoButton = "",
  action,
}: ConfirmationModalProps) {
  const [loading, setLoading] = useState(false);

  const handleOkClick = async () => {
    setLoading(true);
    try {
      await onOk(confirmationItemId);
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  return (
    <div className="flex flex-col gap-10 p-10 items-center w-full">
      <p className="text-base text-gray-800 dark:text-white text-center pt-10">
        {text}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          disabled={loading}
          className={`px-4 py-2 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white dark:border-white/20 dark:hover:bg-gray-700 transition ${classNameNoButton}`}
        >
          {cancelText}
        </button>
        <button
          onClick={handleOkClick}
          disabled={loading}
          className={`px-4 py-2 rounded-md border border-transparent bg-black text-white hover:bg-gray-900 transition disabled:opacity-50 ${classNameOkButton}`}
        >
          {loading ? <Loader /> : okText}
        </button>
      </div>
    </div>
  );
}
