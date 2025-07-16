import imageCompression from "browser-image-compression";

export const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setImageUrl: (url: string | null) => void,
  setLoading: (loading: boolean) => void
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    setLoading(true);

    // Compress image
    const compressedFile = await imageCompression(file, options);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET || "");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log("data:", data);
    setImageUrl(data.secure_url || null);
  } catch (error) {
    console.error("Image compression/upload failed:", error);
  } finally {
    setLoading(false);
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    // Compress image
    const compressedFile = await imageCompression(file, options);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET || "");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    
    if (!data.secure_url) {
      throw new Error("Failed to upload image");
    }
    
    return data.secure_url;
  } catch (error) {
    console.error("Image compression/upload failed:", error);
    throw error;
  }
};
