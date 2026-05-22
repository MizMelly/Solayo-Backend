const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const uploadImage = async (file) => {
  if (!file) return "";

  const base64 = await toBase64(file);

  try {
    const res = await axios.post(
      `${API}/blogs/upload`,
      {
        file: base64,
        filename: file.name,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return res.data.imageUrl;
  } catch (err) {
    console.log(err.message);
    toast.error("Image upload failed");
    return "";
  }
};