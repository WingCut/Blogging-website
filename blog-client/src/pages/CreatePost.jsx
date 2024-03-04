import { useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import EditPost from "../components/EditPost";

const CreatePost = () => {
  const [createState, setCreateState] = useState("create");

  const {
    userAuth: { user_token },
    setUserAuth,
  } = useContext(UserContext);
  return user_token === null ? (
    <Navigate to="/login" />
  ) : createState === "create" ? (
    <EditPost />
  ) : (
    <h1>Pushlish post</h1>
  );
};
export default CreatePost;
