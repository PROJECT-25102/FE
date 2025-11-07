export async function uploadImage(
  file: File,
  uploadPreset: string = "beestar",
  cloudName: string = "duqkfo7xo",
): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  return (data.secure_url as string) || null;
}
