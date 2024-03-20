import axios from "axios";
import { useEffect, useState } from "react";
import NavbarNavigate from "../components/NavbarNavigate";
import Loader from "../components/Loader";
import BlogCard from "../components/BlogCard";
import TrendingBlogCard from "../components/TrendingBlogCard";
import { activeTabRef } from "../components/NavbarNavigate";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const [catergoryState, setCategoryState] = useState("trang chủ");

  const categories = [
    "du lịch",
    "đời sống",
    "sức khỏe",
    "công nghệ",
    "giáo dục",
    "thể thao",
    "phim ảnh",
    "thời trang",
  ];

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

  const fetchBlogsByCategory = () => {
    axios
      .post("http://localhost:3000/search-blogs", { tag: catergoryState })
      .then(({ data }) => {
        setBlogs(data.blogs);
        console.log(data.blogs);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    activeTabRef.current.click();

    if (catergoryState === "trang chủ") {
      fetchLatesBlogs();
    } else {
      fetchBlogsByCategory();
    }

    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [catergoryState]);

  const loadBlogByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();
    setBlogs(null);

    if (catergoryState === category) {
      setCategoryState("trang chủ");
      return;
    }
    setCategoryState(category);
  };

  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex justify-center gap-10">
        {/* blog mới nhất*/}
        <div className="w-full px-[5vw] py-5">
          <NavbarNavigate
            routes={[catergoryState, "xu hướng"]}
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
                return <TrendingBlogCard key={i} index={i} blog={blog} />;
              })
            )}
          </NavbarNavigate>
        </div>
        {/* blog xu hướng */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-[#F3F3F3] pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">Các chủ đề xu hướng</h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => {
                  return (
                    <button
                      onClick={loadBlogByCategory}
                      key={i}
                      className={
                        "tag " +
                        (catergoryState === category
                          ? "bg-black text-white "
                          : " ")
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="font-medium text-xl mb-8">
                Blog xu hướng <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>
              {trendingBlogs === null ? (
                <Loader />
              ) : (
                trendingBlogs.map((blog, i) => {
                  return <TrendingBlogCard key={i} index={i} blog={blog} />;
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
