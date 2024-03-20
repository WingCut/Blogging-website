import { Link } from "react-router-dom";
import { getDay } from "../common/date";
const TrendingBlogCard = ({ blog, index }) => {
  const {
    title,
    blog_id: id,
    author: {
      user_info: { fullname, username, profile_img },
    },
    publishedAt,
  } = blog;

  return (
    <div className="flex items-center gap-5 mb-8 ">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-bold text-[#b1b1b1] leading-none">
        {index < 10 ? "0" + (index + 1) : index}
      </h1>
      <div>
        <div className="flex gap-2 items-center my-3">
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
          <h1 className="text-2xl font-medium leading-8 line-clamp-3 sm:line-clamp-2 hover:underline p-2">
            {title}
          </h1>
        </Link>
      </div>
    </div>
  );
};
export default TrendingBlogCard;
