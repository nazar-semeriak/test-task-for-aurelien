import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export const ImageDrop = ({ callbackImage, initialValue }) => {
  const [selectedImage, setSelectedImage] = useState(initialValue);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming you want to allow only one image
    setSelectedImage(URL.createObjectURL(file)); // Display the selected image

    callbackImage(file);

    // You can also upload the file or do other operations here
    // For example, you can send the file to your server
    // callbackImage({ uri: URL.createObjectURL(file), file }); // Send the image data back to the parent component
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // You can specify the accepted file types
    multiple: false, // Allow only one file to be selected
  });

  return (
    <div {...getRootProps()} className="image-picker">
      <input {...getInputProps()} />
      {selectedImage ? (
        <img src={selectedImage} className="img-fluid" alt="Selected" />
      ) : (
        <p>Déposez une image ou cliquez dessus</p>
      )}
    </div>
  );
};
