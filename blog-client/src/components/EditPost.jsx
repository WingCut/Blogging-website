import { Link } from "react-router-dom";
import blogBanner from "../assets/imgs/blog banner.png";
import { useContext, useEffect, useRef, useState } from "react";
import { imageUpload } from "./ImageUpload";
import toast, { Toaster } from "react-hot-toast";
import { BlogContext } from "../pages/CreatePost";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./Tools";

const EditPost = () => {
  // const [imageUrl, setImageUrl] = useState("");

  const {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textBlog,
    setTextBlog,
    setCreateBlogState,
  } = useContext(BlogContext);

  useEffect(() => {
    setTextBlog(
      new EditorJS({
        holderId: "textEditor",
        data: content,
        tools: tools,
        placeholder: "Nội dung bài viết....",
      })
    );
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0], "image");
    imageUpload(uploadData)
      .then(async () => {
        const loadingToast = toast.loading("Đang tải ảnh lên....");
        const data = await imageUpload(uploadData);
        toast.dismiss(loadingToast);
        toast.success("Ảnh đã được tải lên");
        //setImageUrl(data.secure_url);
        setBlog({ ...blog, banner: data.secure_url });
      })
      .catch((err) => console.error("Lỗi tải ảnh:", err));
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
  const handleError = (e) => {
    const img = e.target;
    img.src = blogBanner;
  };

  const handlePublishBtn = () => {
    if (!banner.length) {
      return toast.error("Hãy tải ảnh đại diện bài viết!");
    }
    if (!title.length) {
      return toast.error("Hãy thêm tiêu đề bài viết!");
    }
    if (!textBlog.state) {
      textBlog
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setCreateBlogState("publish");
          } else {
            return toast.error("Hãy thêm nội dung bài viết!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          <button className="btn-dark" type="submit" onClick={handlePublishBtn}>
            Đăng
          </button>
          <button className="btn-light ">Lưu </button>
        </div>
      </nav>
      <Toaster />
      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video border-4 border-white">
            <label htmlFor="uploadImage">
              <img src={banner} className="z-10" onError={handleError} />
              <input
                id="uploadImage"
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={(e) => handleFileUpload(e)}
              />
            </label>
            <textarea
              defaultValue={title}
              placeholder="Tiêu đề"
              className="text-3xl resize-none font-medium w-full h-20 outline-none mt-10 leading-tight border-[#F3F3F3] placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-10 my-5 " />
            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </div>
      </section>
    </>
  );
};
export default EditPost;
