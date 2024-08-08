import React, { useState } from "react";
import EditorJs from "react-editor-js";
// import CheckList from "@editorjs/checklist";

// import Delimiter from "@editorjs/delimiter";
// import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
// import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";

// import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header";
// import ColorPlugin from "editorjs-text-color-plugin";
// import CustomEmojiInlineTool from "./EditorCustomTools/CustomEmojiInlineTool";
// import Gifs from "./EditorCustomTools/CustomGifsBlock";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const CustomEditor = ({
  data,
  imageArray,
  handleInstance,
  readOnly,
  token,
}) => {
  const EDITOR_JS_TOOLS = {
    // embed: {
    //   class: Embed,
    //   config: {
    //     services: {
    //       youtube: true,
    //       instagram: true,
    //       facebook: true,
    //       twitter: true,
    //       vimeo: true,
    //     },
    //   },
    // },
    header: Header,
    list: List,
    // Color: {
    //   class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    //   config: {
    //     colorCollections: [
    //       "#FF1300",
    //       "#EC7878",
    //       "#9C27B0",
    //       "#673AB7",
    //       "#3F51B5",
    //       "#0070FF",
    //       "#03A9F4",
    //       "#00BCD4",
    //       "#4CAF50",
    //       "#8BC34A",
    //       "#CDDC39",
    //       "#FFF",
    //       "#000",
    //     ],
    //     defaultColor: "#FF1300",
    //     type: "text",
    //   },
    // },
    // Marker: {
    //   class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    //   config: {
    //     defaultColor: "#FFBF00",
    //     type: "marker",
    //   },
    // },
    // codeBox: CodeBox,
    linkTool: LinkTool,
    image: {
      class: Image,
      config: {
        uploader: {
          uploadByFile(file) {
            let formData = new FormData();
            formData.append("files", file);
            const options = {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            };
            return fetch(`${API_URL}/upload`, options)
              .then((response) => response.json())
              .then((data) => {
                imageArray.push(data[0].url);
                return {
                  success: 1,
                  file: {
                    url: data[0].url,
                  },
                };
              })
              .catch((err) => {});
          },
        },
      },
    },
    // quote: Quote,
    // checklist: CheckList,
    // delimiter: Delimiter,
    // inlineCode: InlineCode,
    // simpleImage: SimpleImage,
    // emoji: CustomEmojiInlineTool,
    // gifs: Gifs,
  };

  // Editor.js This will show block editor in component
  // pass EDITOR_JS_TOOLS in tools props to configure tools with editor.js
  return (
    <>
      <EditorJs
        instanceRef={(instance) => handleInstance(instance)}
        tools={EDITOR_JS_TOOLS}
        data={data}
        // placeholder={`text du post`}
        readOnly={readOnly}
      />
    </>
  );
};

export default CustomEditor;
