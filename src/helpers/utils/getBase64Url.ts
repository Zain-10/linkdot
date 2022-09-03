const getBase64URL = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(typeof reader.result);
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
  });
};

export { getBase64URL };
