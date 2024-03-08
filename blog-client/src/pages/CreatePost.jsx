import { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import EditPost from "../components/EditPost";
import PushlishPost from "../components/PushlishPost";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { user_info: {} },
};

export const BlogContext = createContext({});

const CreatePost = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [createBlogState, setCreateBlogState] = useState("editor");
  const [textBlog, setTextBlog] = useState({ state: false });

  const {
    userAuth: { user_token },
    setUserAuth,
  } = useContext(UserContext);
  return (
    <BlogContext.Provider
      value={{
        blog,
        setBlog,
        createBlogState,
        setCreateBlogState,
        textBlog,
        setTextBlog,
      }}
    >
      {user_token === null ? (
        <Navigate to="/login" />
      ) : createBlogState === "editor" ? (
        <EditPost />
      ) : (
        <PushlishPost />
      )}
    </BlogContext.Provider>
  );
};
export default CreatePost;
