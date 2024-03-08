import { useContext } from "react";
import { BlogContext } from "../pages/CreatePost";

const Tags = ({ tag, tagIndex }) => {
  const {
    blog,
    blog: { tags },
    setBlog,
  } = useContext(BlogContext);

  const addEditTag = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };

  const handleTagEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const currentTag = e.target.innerText;
      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags });
      e.target.setAttribute("contentEditable", false);
    }
  };

  const handleTagDel = () => {
    const delTags = tags.filter((tg) => tg != tag);
    setBlog({ ...blog, tags: delTags });
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-40 pr-10">
      <p
        className="outline-none"
        onKeyDown={handleTagEdit}
        onClick={addEditTag}
      >
        {tag}
      </p>
      <button
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
        onClick={handleTagDel}
      >
        <i className="fi fi-br-cross text-xs pointer-events-none"></i>
      </button>
    </div>
  );
};
export default Tags;
