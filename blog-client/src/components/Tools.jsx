import Ember from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

import { imageUpload } from "./ImageUpload";

const uploadImageByFile = async (file) => {
  const uploadData = new FormData();
  uploadData.append("image", file);

  try {
    const response = await imageUpload(uploadData);
    if (response && response.secure_url) {
      return {
        success: 1,
        file: {
          url: response.secure_url, // Sử dụng URL trả về
        },
      };
    } else {
      return { success: 0 };
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: 0 };
  }
};

const uploadImageByUrl = (url) => {
  return Promise.resolve({
    success: 1,
    file: { url },
  });
};

export const tools = {
  ember: Ember,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Tiêu đề",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  InlineCode: InlineCode,
};
