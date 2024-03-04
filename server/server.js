import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";

//model
import User from "./models/userModel.js";

//routers
import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
const PORT = 3000;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

mongoose.connect(process.env.MONGO_URL, {
  autoIndex: true,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/uploadUrl", (req, res) => {});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// auth Controler
// const formatDatatoSend = (user) => {
//   const user_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//   return {
//     user_token,
//     fullname: user.user_info.fullname,
//     username: user.user_info.username,
//     profile_img: user.user_info.profile_img,
//   };
// };
// const generateUsername = async (email) => {
//   const username = await generateUsername(email);

//   const usernameExist = await User.exists({
//     "user_info.username": username,
//   }).then((result) => result);

//   usernameExist ? (username += nanoid().substring(0, 4)) : "";
//   return username;
// };

// app.post("/register", (req, res) => {
//   let { fullname, email, password } = req.body;

//   if (fullname.length < 3 || fullname === "") {
//     return res.status(403).json({ error: "Họ tên cần dài hơn 3 ký tự" });
//   }

//   if (!email.length) {
//     return res.status(403).json({ error: "Hãy nhập Email" });
//   }

//   if (!emailRegex.test(email)) {
//     return res.status(403).json({ error: "Email không hợp lệ" });
//   }

//   if (!password || password === "") {
//     return res.status(403).json({ error: "Hãy nhập mật khẩu" });
//   }
//   if (!passwordRegex.test(password)) {
//     return res.status(403).json({
//       error:
//         "Mật khẩu phải dài ít nhất 6 đến 20 ký tự, bao gồm 1 chữ số, 1 chữ hoa và 1 chữ thường",
//     });
//   }

//   bcrypt.hash(password, 10, (err, hashed_password) => {
//     const username = email.split("@")[0];
//     const user = new User({
//       user_info: { fullname, email, password: hashed_password, username },
//     });

//     user
//       .save()
//       .then((user) => {
//         return res.status(200).json(formatDatatoSend(user));
//       })
//       .catch((err) => {
//         if (err.code == 11000) {
//           return res.status(500).json({ error: "Email đã tồn tại" });
//         }
//         return res.status(500).json({ error: err.message });
//       });
//   });
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   User.findOne({ "user_info.email": email })
//     .then((user) => {
//       if (!user) {
//         return res
//           .status(403)
//           .json({ error: "Không tìm thấy Email người dùng" });
//       }
//       bcrypt.compare(password, user.user_info.password, (err, result) => {
//         if (err) {
//           return res.status(403).json({ error: "Xảy ra lỗi vui lòng thử lại" });
//         }
//         if (!result) {
//           return res
//             .status(403)
//             .json({ error: "Sai mật khẩu vui lòng thử lại" });
//         } else {
//           return res.status(200).json(formatDatatoSend(user));
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//       return res.status(500).json({ error: err.message });
//     });
// });
