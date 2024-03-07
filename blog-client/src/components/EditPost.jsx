import { Link } from "react-router-dom";
import blogBanner from "../assets/imgs/blog banner.png";
import { useContext, useRef, useState } from "react";
import { imageUpload } from "./ImageUpload";
import toast, { Toaster } from "react-hot-toast";
import { BlogContext } from "../pages/CreatePost";

const EditPost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const blogRef = useRef();

  const {
    blog,
    blog: { title, image, content, tags, des },
    setBlog,
  } = useContext(BlogContext);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0], "image");
    imageUpload(uploadData)
      .then(async (url) => {
        const loadingToast = toast.loading("Đang tải ảnh lên....");
        if (url) {
          const data = await imageUpload(uploadData);
          toast.dismiss(loadingToast);
          toast.success("Ảnh đã được tải lên");
          setImageUrl(data.secure_url);
          setBlog({});
        }
      })
      .catch((err) => console.error("Error uploading image:", err));
    // try {

    // } catch (error) {

    // }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className=" whitespace-nowrap font-semibold">
          <span className="text-2xl px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Blog's Share
          </span>
        </Link>
        <p className="max-md:hidden text-black w-full">Tạo bài viết mới</p>
        <div className="flex gap-2 px-2 ml-auto">
          <button className="btn-dark" type="submit">
            Đăng Blog
          </button>
          <button className="btn-light ">Lưu Blog</button>
        </div>
      </nav>
      <Toaster />
      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video border-4 border-[#F3F3F3]">
            <label htmlFor="uploadImage" ref={blogRef}>
              {imageUrl ? (
                <img src={imageUrl} className="z-10" />
              ) : (
                <img src={blogBanner} className="z-10" />
              )}
              <input
                id="uploadImage"
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={(e) => handleFileUpload(e)}
              />
            </label>
            <textarea
              placeholder="Tiêu đề"
              className="text-3xl font-medium w-full h-20 outline-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
          </div>
        </div>
      </section>
    </>
  );
};
export default EditPost;
