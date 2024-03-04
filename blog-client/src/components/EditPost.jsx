import { Link } from "react-router-dom";
import blogBanner from "../assets/imgs/blog banner.png";
import { useEffect, useRef, useState } from "react";

const EditPost = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const fileRef = useRef();

  const handleBannerUpload = (e) => {
    const img = e.target.files[0];
    setUploadImage(img);
    setImageFileUrl(URL.createObjectURL(img));
  };
  useEffect(() => {
    if (uploadImage) {
    }
  });

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
      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video border-4 border-[#F3F3F3]">
            <label htmlFor="uploadImage" ref={fileRef}>
              <img
                src={
                  imageFileUrl ? URL.createObjectURL(uploadImage) : blogBanner
                }
                className="z-10"
              />
              <input
                id="uploadImage"
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={handleBannerUpload}
              />
            </label>
          </div>
        </div>
      </section>
    </>
  );
};
export default EditPost;
