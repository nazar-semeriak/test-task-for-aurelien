import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { dropZoneText } from "@/data/dropZone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const maxSize = 5 * 1000000;
function sizeValidator(file) {
  if (file?.size > maxSize) {
    return {
      code: "name-too-large",
      message: `Le fichier fait plus ${maxSize / 1000000} MB`,
    };
  }

  return null;
}

const KrDropZone = ({ parentCallback }) => {
  const [myFiles, setMyFiles] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
      parentCallback([...myFiles, ...acceptedFiles]);
    },
    [myFiles, parentCallback]
  );
  const {
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    // accept: { "image/*": [] },
    // maxSize: 0.8 * 1000000,
    validator: sizeValidator,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const removeFile = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    parentCallback(newFiles);
  };

  const fileTypeSwitch = (file) => {
    switch (file?.type) {
      case "text/plain":
        return "fa-regular fa-file-lines";
      case file?.type.match(/image/)?.input:
        return "fa-regular fa-file-image";
      case "application/word":
        return "fa-regular fa-file-word";
      case "application/zip":
        return "fa-regular fa-file-zipper";
      case "application/pdf":
        return "fa-regular fa-file-pdf";
      default:
        return "fa-regular fa-file";
    }
  };

  const acceptedFileItems = myFiles.map((file) => {
    let fileType = fileTypeSwitch(file);
    return (
      <div className="pb-3" key={file.path}>
        <i className={`${fileType} text-secondary-700 pe-2`}></i>
        {file.path}
        <a className="cursor-pointer p-2" onClick={removeFile(file)}>
          <i className="fa fa-close text-danger"></i>
        </a>
      </div>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    let fileType = fileTypeSwitch(file);
    return (
      <div className="pb-3" key={file.path}>
        <i className={`${fileType} text-secondary-700 pe-2`}></i>
        {file.path}
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </div>
    );
  });

  return (
    <section className="">
      {/* <label>{item.label}</label> */}
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="text-secondary-300">{dropZoneText.text}</p>
      </div>
      <aside>
        {acceptedFileItems?.length > 0 && (
          <>
            <h4 className="my-3 text-success"> {dropZoneText.filesName}</h4>
            <ul>{acceptedFileItems}</ul>
          </>
        )}
        {fileRejectionItems?.length > 0 && (
          <>
            <h4 className="my-3 text-warning"> {dropZoneText.fileRefuse}</h4>
            <ul>{fileRejectionItems}</ul>
          </>
        )}
      </aside>
    </section>
  );
};

export default KrDropZone;
