import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BlogContext } from "../pages/CreatePost";

const PushlishPost = () => {
  const limitCharacter = 200;
  const {
    blog,
    blog: { title, image, tags, des },
    setBlog,
    setCreateBlogState,
  } = useContext(BlogContext);

  const handleCloseEvent = () => {
    setCreateBlogState("editor");
  };

  const handleBlogTitleChange = (e) => {
    const input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleDesChange = (e) => {
    const input = e.target;
    setBlog({ ...blog, des: input.value });
  };

  return (
    <section className=" min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4 mx-4">
      <Toaster />
      <div>
        <button
          className="2-12 h-12 absolute right-[5vh] top-[5%] z-10"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-br-cross"></i>
        </button>
        <div className="max-w-[550px] mx-auto ">
          <p className="text-[#6B6B6B] mb-1">Xem trước</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-[#F3F3F3] mt-4 ">
            <img src={image} alt="" />
          </div>
          <h1 className="text-3xl font-medium leading-tight mt-2 line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4 ">
            {des}
          </p>
        </div>
      </div>
      <div className="border-[#F3F3F3] lg:pl-8">
        <p className="pl-4 text-[#6B6B6B] mb-2 mt-9">Tiêu đề</p>
        <input
          type="text"
          placeholder="Tiêu đề"
          defaultValue={title}
          className="input-box pl-4"
          onChange={handleBlogTitleChange}
        />
        <p className="pl-4 text-[#6B6B6B] mb-2 mt-9">Mô tả ngắn về blog</p>
        <textarea
          maxLength={limitCharacter}
          defaultValue={des}
          className="h-40 resize-none leading-7 input-box pl-4"
          onChange={handleDesChange}
        ></textarea>
        <p className="mt-1 text-[#6B6B6B] text-sm text-right">
          {limitCharacter - des.length} kí tự
        </p>
      </div>
    </section>
  );
};
export default PushlishPost;
