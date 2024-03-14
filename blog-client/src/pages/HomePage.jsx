import axios from "axios";
import { useEffect, useState } from "react";
import NavbarNavigate from "../components/NavbarNavigate";
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";
import MiniBlogCard from "../components/MiniBlogCard";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);

  const fetchLatesBlogs = () => {
    axios
      .get("http://localhost:3000/latest-blogs")
      .then(({ data }) => setBlogs(data.blogs))
      .catch((err) => console.log(err));
  };

  const fetchTrendingBlogs = () => {
    axios
      .get("http://localhost:3000/trending-blogs")
      .then(({ data }) => setTrendingBlogs(data.blogs))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLatesBlogs();
    fetchTrendingBlogs();
  }, []);

  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex justify-center gap-10">
        {/* blog mới nhất*/}
        <div className="w-full px-[5vw] py-5">
          <NavbarNavigate
            routes={["trang chủ", "xu hướng"]}
            hidden={["xu hướng"]}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                blogs.map((blog, i) => {
                  return (
                    <BlogCard
                      key={i}
                      content={blog}
                      author={blog.author.user_info}
                    />
                  );
                })
              )}
            </>

            {trendingBlogs === null ? (
              <Loader />
            ) : (
              trendingBlogs.map((blog, i) => {
                return <MiniBlogCard key={i} index={i} blog={blog} />;
              })
            )}
          </NavbarNavigate>
        </div>
        {/* blog xu hướng */}
        <div className="mix-w-[40%] lg:min-w-[400px] max-w-min border-[#F3F3F3] pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <h1 className="font-medium text-xl mb-8">Các chủ đề xu hướng</h1>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
