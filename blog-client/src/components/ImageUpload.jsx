import axios from "axios";
export const imageUpload = async (fileUpload) => {
  return await axios
    .post("http://localhost:3000/uploadUrl", fileUpload)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
