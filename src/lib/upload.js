import { supabase } from "../config/supabaseClient";

export const uploadImage = async (file, userId) => {
  if (!file) {
    console.error("No file selected");
    return null;
  }

  const fileExt = file.name.split(".").pop(); // Get file extension
  const fileName = `${userId}-${Date.now()}.${fileExt}`; // Unique filename
  const filePath = `avatars/${fileName}`; // Folder in Supabase storage

  const { data, error } = await supabase.storage
    .from("chatMedia") // Change this to your storage bucket name
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (error) {
    console.error("Upload failed:", error.message);
    return null;
  }

  // Get the public URL of the uploaded image
  const { data: publicURLData } = supabase.storage
    .from("chatMedia")
    .getPublicUrl(filePath);

  if (publicURLError) {
    console.error("Failed to get public URL:", publicURLError.message);
    return null;
  }

  return publicURLData.publicUrl;
};
