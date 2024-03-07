import { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import EditPost from "../components/EditPost";

const blogStructure = {
  title: "",
  image: "",
  content: [],
  tags: [],
  des: "",
  author: { user_info: {} },
};

export const BlogContext = createContext({});

const CreatePost = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [createState, setCreateState] = useState("create");

  const {
    userAuth: { user_token },
    setUserAuth,
  } = useContext(UserContext);
  return (
    <BlogContext.Provider
      value={{ blog, setBlog, createState, setCreateState }}
    >
      {user_token === null ? (
        <Navigate to="/login" />
      ) : createState === "create" ? (
        <EditPost />
      ) : (
        <h1>Pushlish post</h1>
      )}
    </BlogContext.Provider>
  );
};
export default CreatePost;
