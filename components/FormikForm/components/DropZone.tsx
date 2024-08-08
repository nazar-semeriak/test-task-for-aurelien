import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useGForm } from "../FormikForm.props";
import { BaseField } from "./BaseField";
import { Button } from "@/components/ui/button";

export default function DropZone(props: any) {
  const {
    valName,
    text,
    tx,
    multiple = false,
    acceptedTypes = "image/*",
    maxFileSize = 10048576, // Default to ~10MB
    placeholder,
    placeholderTx,
    hintText,
    tooltipText,
    tooltipTx,
    required,
    ...rest
  } = props;

  const { setFieldValue, values } = useGForm();

  // Initialize selectedImages with default values if they exist
  const [selectedImages, setSelectedImages] = useState(() => {
    if (values[valName] && values[valName].url) {
      // Assuming the URL directly points to the image, suitable for display purposes
      return [values[valName].url];
    }
    return [];
  });

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const files = multiple ? acceptedFiles : [acceptedFiles[0]];
      setFieldValue(valName, files);
      setSelectedImages(files);
    },
    [multiple, setFieldValue, valName]
  );

  const deleteImage = useCallback(
    (imageIndex: any) => {
      const newImages = selectedImages.filter(
        (_, index) => index !== imageIndex
      );
      setSelectedImages(newImages);
      setFieldValue(valName, newImages.length ? newImages : null);
    },
    [selectedImages, setFieldValue, valName]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple,
  });

  const renderImages = () =>
    selectedImages.map((image, index) => {
      const isFileObject = typeof image === "object" && image instanceof File;
      const imageUrl = isFileObject ? URL.createObjectURL(image) : image;
      return (
        <div key={index} className="w-full h-auto relative">
          <img
            src={imageUrl}
            alt={`Selected image ${index + 1}`}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <button
            type="button"
            onClick={() => deleteImage(index)}
            className="absolute top-0 right-0 bg-red-500 text-white p-1"
          >
            X
          </button>
        </div>
      );
    });

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => {
        // if (typeof image === "object" && image instanceof File) {
        if (typeof image === "object") {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [selectedImages]);

  return (
    <BaseField
      text={text}
      tx={tx}
      hintText={hintText}
      tooltipText={tooltipText}
      tooltipTx={tooltipTx}
      valName={valName}
      required={required}
    >
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => e.preventDefault()}
          >
            Uploader une image
          </Button>
        </div>
        <aside>
          <div className="grid grid-cols-3 gap-4 mt-2">{renderImages()}</div>
        </aside>
      </section>
    </BaseField>
  );
}
