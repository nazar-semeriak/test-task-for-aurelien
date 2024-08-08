// import Image from "@editorjs/image";
const Image = require("@editorjs/image");
const Link = require("@editorjs/link");
const List = require("@editorjs/list");
const Paragraph = require("@editorjs/paragraph");
const Header = require("@editorjs/header");
const Hyperlink = require("editorjs-hyperlink");

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: "Choisissez une taille de titre",
      levels: [1, 2, 3, 4],
      defaultLevel: 2,
    },
  },
  hyperlink: {
    class: Hyperlink,
    config: {
      shortcut: "CMD+L",
      target: "_blank",
      rel: "nofollow",
      availableTargets: ["_blank", "_self"],
      availableRels: ["author", "noreferrer"],
      validate: false,
    },
  },

  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file: File) {
          let formData = new FormData();
          formData.append("files", file);
          const options = {
            method: "POST",
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
            body: formData,
          };
          return fetch(`${API_URL}/api/upload`, options)
            .then((response) => response.json())
            .then((data) => {
              //   imageArray.push(data[0].url);
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
  link: Link,
  list: {
    class: List,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  // i18n: {
  //   toolNames: {
  //     Hyperlink: "Lien",
  //   },
  //   tools: {
  //     hyperlink: {
  //       Save: "Enregistrer",
  //       "Select target": "Sélectionner la cible",
  //       "Select rel": "Sélectionner rel",
  //     },
  //   },
  // },
};
