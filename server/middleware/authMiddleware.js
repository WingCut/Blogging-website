import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  //Bearer
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(401).json({ error: "Người dùng chưa có mã truy cập!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Mã truy cập không hợp lệ!" });
    }
    req.user = user.id;
    next();
  });
};

export const formatDatatoSend = (user) => {
  const user_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return {
    user_token,
    fullname: user.user_info.fullname,
    username: user.user_info.username,
    profile_img: user.user_info.profile_img,
  };
};
