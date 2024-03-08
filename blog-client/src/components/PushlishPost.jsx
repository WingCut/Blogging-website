import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BlogContext } from "../pages/CreatePost";
import Tags from "./Tags";

const PushlishPost = () => {
  const limitCharacter = 200;
  const tagLimit = 10;
  const {
    blog,
    blog: { title, banner, tags, des },
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

  const handleDesKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTagsKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`Bài viết chỉ chứa tối đa ${tagLimit} chủ để`);
      }
      e.target.value = "";
    }
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
            <img src={banner} alt="" />
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
        <p className="pl-4 text-black mb-2 mt-9">Tiêu đề</p>
        <input
          type="text"
          placeholder="Tiêu đề"
          defaultValue={title}
          className="input-box pl-4 placeholder:text-[#6B6B6B]"
          onChange={handleBlogTitleChange}
        />
        <p className="pl-4 text-black mb-2 mt-8">Mô tả ngắn về blog</p>
        <textarea
          maxLength={limitCharacter}
          defaultValue={des}
          className="h-40 resize-none leading-7 input-box pl-4 placeholder:text-[#6B6B6B]"
          onChange={handleDesChange}
          onKeyDown={handleDesKeyDown}
        ></textarea>
        <p className="mt-1 text-[#6B6B6B] text-sm text-right">
          {limitCharacter - des.length} kí tự
        </p>
        <p className="pl-4 text-black mb-2 mt-6">Chủ đề (Tags)</p>
        <div className="relative input-box pl-4 py-2 pb-4">
          <input
            type="text"
            placeholder="Chủ đề"
            className="input-box sticky bg-white top-0 left-0 pl-4 mb-3 placeholder:text-[#6B6B6B]"
            onKeyDown={handleTagsKeyDown}
          />
          {tags.map((tag, i) => {
            return <Tags tag={tag} tagIndex={i} key={i} />;
          })}
        </div>
        <p className="mt-1 text-[#6B6B6B] text-sm text-right">
          {tagLimit - tags.length} chủ đề
        </p>
        <button className="btn-dark px-8 mt-4">Đăng</button>
      </div>
    </section>
  );
};
export default PushlishPost;
