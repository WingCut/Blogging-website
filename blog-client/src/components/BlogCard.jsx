import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogCard = ({ content, author }) => {
  const {
    banner,
    title,
    des,
    tags,
    publishedAt,
    activity: { total_likes },
    blog_id: id,
  } = content;
  const { fullname, username, profile_img } = author;

  return (
    <div className="flex gap-6 items-center border-b border-[#F3F3F3] pb-5 mb-4 px-4">
      <div className="w-full">
        <div className="flex gap-2 items-center my-4 ">
          <img
            src={profile_img}
            alt="ảnh đại diện"
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p>{getDay(publishedAt)}</p>
        </div>
        <Link to={`/blog/${id}`}>
          <h1 className="text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2 hover:underline">
            {title}
          </h1>
        </Link>

        <p className="my-3 text-sm font-gelasio leading-6 max-sm:hidden line-clamp-2">
          {des}
        </p>
        <div className="flex items-center gap-4 my-5">
          <span className="btn-light py-1 px-4">{tags[0]}</span>
          <span className="ml-4 flex items-center gap-2">
            <i className="fi fi-rr-heart"></i>
            {total_likes}
          </span>
        </div>
      </div>
      <div className="h-28 aspect-square">
        <img
          src={banner}
          alt="ảnh tiêu đề"
          className="w-full h-full aspect-square object-cover rounded"
        />
      </div>
    </div>
  );
};
export default BlogCard;
