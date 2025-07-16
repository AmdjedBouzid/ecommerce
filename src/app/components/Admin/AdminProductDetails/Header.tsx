import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button/Button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
interface HeaderProps {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIds: number[];
  openModal: () => void;
  deleteLoading: boolean;
}
function Header({
  editing,
  setEditing,
  setDeleteConfirm,
  selectedIds,
  openModal,
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8 flex-wrap">
      <div className="flex items-center gap-4    ">
        <Button
          variant="outline"
          onClick={() => router.push("/Admin/Products")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Button>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2"
        >
          <Edit size={20} />
          {editing ? "Cancel Edit" : "Edit Product"}
        </Button>
        <Button
          onClick={() => {
            setDeleteConfirm(true);
            openModal();
          }}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
        >
          <Trash2 size={20} />
          {selectedIds.length > 0 ? "Delete Images" : "Delete Product"}
        </Button>
      </div>
    </div>
  );
}

export default Header;
