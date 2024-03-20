import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

//model
import User from "./models/userModel.js";
import Blog from "./models/blogModel.js";

dotenv.config();
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URL, {
  autoIndex: true,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-website",
    allowedFormats: ["jpg", "png", "gif", ".jpeg"],
    transformation: [
      { width: 1000, crop: "scale" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  },
});

const upload = multer({ storage: storage });

app.post(
  "/uploadUrl",
  upload.fields([{ name: "image" }]),
  async (req, res, next) => {
    const file = req.files["image"][0];
    if (!file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ secure_url: file.path });
  }
);

const verifyJWT = (req, res, next) => {
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

const formatDatatoSend = (user) => {
  const user_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return {
    user_token,
    fullname: user.user_info.fullname,
    username: user.user_info.username,
    profile_img: user.user_info.profile_img,
  };
};
const generateUsername = async (email) => {
  const username = await generateUsername(email);

  const usernameExist = await User.exists({
    "user_info.username": username,
  }).then((result) => result);

  usernameExist ? (username += nanoid().substring(0, 4)) : "";
  return username;
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// Thêm người dùng
app.post("/register", (req, res) => {
  let { fullname, email, password } = req.body;

  if (fullname.length < 3 || fullname === "") {
    return res.status(403).json({ error: "Họ tên cần dài hơn 3 ký tự" });
  }

  if (!email.length) {
    return res.status(403).json({ error: "Hãy nhập Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email không hợp lệ" });
  }

  if (!password || password === "") {
    return res.status(403).json({ error: "Hãy nhập mật khẩu" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Mật khẩu phải dài ít nhất 6 đến 20 ký tự, bao gồm 1 chữ số, 1 chữ hoa và 1 chữ thường",
    });
  }

  bcrypt.hash(password, 10, (err, hashed_password) => {
    const username = email.split("@")[0];
    const user = new User({
      user_info: { fullname, email, password: hashed_password, username },
    });

    user
      .save()
      .then((user) => {
        return res.status(200).json(formatDatatoSend(user));
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(500).json({ error: "Email đã tồn tại" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
});

// Login người dùng
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email.length) {
    return res.status(403).json({ error: "Hãy nhập Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email không hợp lệ" });
  }

  if (!password || password === "") {
    return res.status(403).json({ error: "Hãy nhập mật khẩu" });
  }

  User.findOne({ "user_info.email": email })
    .then((user) => {
      if (!user) {
        return res
          .status(403)
          .json({ error: "Không tìm thấy Email người dùng" });
      }
      bcrypt.compare(password, user.user_info.password, (err, result) => {
        if (err) {
          return res.status(403).json({ error: "Xảy ra lỗi vui lòng thử lại" });
        }
        if (!result) {
          return res
            .status(403)
            .json({ error: "Sai mật khẩu vui lòng thử lại" });
        } else {
          return res.status(200).json(formatDatatoSend(user));
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    });
});

//Lấy blog mới nhất
app.get("/latest-blogs", (req, res) => {
  const maxLimit = 5;

  Blog.find({ draft: false })
    .populate(
      "author",
      "user_info.profile_img user_info.fullname user_info.username -_id"
    )
    .sort({ publishedAt: -1 })
    .select("blog_id title des banner activity tags publishedAt -_id")
    .limit(maxLimit)
    .then((blogs) => {
      res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

//Lấy blog xu hướng
app.get("/trending-blogs", (req, res) => {
  Blog.find({ draft: false })
    .populate(
      "author",
      "user_info.profile_img user_info.fullname user_info.username -_id"
    )
    .sort({
      "activity.total_reads": -1,
      "activity.total_likes": -1,
      publishedAt: -1,
    })
    .select("blog_id title publishedAt")
    .limit(5)
    .then((blogs) => {
      return res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

//search blog theo tag
app.post("/search-blogs", (req, res) => {
  const { tag } = req.body;
  const findQuery = { tags: tag, draft: false };

  const maxLimit = 5;
  Blog.find(findQuery)
    .populate(
      "author",
      "user_info.profile_img user_info.fullname user_info.username -_id"
    )
    .sort({ publishAt: -1 })
    .select("blog_id title des banner activity tags publishedAt -_id")
    .limit(maxLimit)
    .then((blogs) => {
      res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

//Tạo bài viết
app.post("/create-blog", verifyJWT, (req, res) => {
  const author_id = req.user;
  const { title, banner, content, des, tags, draft } = req.body;

  if (!title.length) {
    return res.status(403).json({ error: "Hãy thêm tiêu đề bài viết!" });
  }

  if (!draft) {
    if (!banner.length) {
      return res.status(403).json({ error: "Hãy tải ảnh đại diện bài viết!" });
    }
    if (!des.length || des.length > 200) {
      return res
        .status(403)
        .json({ error: "Mô tả ngắn về bài viết dưới 200 kí tự" });
    }
    if (!content.blocks.length) {
      return res.status(403).json({ error: "Hãy thêm nội bài viết!" });
    }
    if (!tags.length || tags.length > 10) {
      return res
        .status(403)
        .json({ error: "Thêm tối đa 10 chủ đề cho bài viết!" });
    }
  }

  const formatTags = tags.map((tag) => tag.toLowerCase());
  const blog_id =
    title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();
  const blog = new Blog({
    title: title,
    banner: banner,
    content: content,
    des: des,
    tags: formatTags,
    author: author_id,
    blog_id: blog_id,
    draft: Boolean(draft),
  });

  blog
    .save()
    .then((blog) => {
      const increValue = draft ? 0 : 1;

      User.findOneAndUpdate(
        { _id: author_id },
        {
          $inc: { "account_info.total_posts": increValue },
          $push: { blogs: blog._id },
        }
      )
        .then((user) => {
          return res.status(200).json({ id: blog.blog_id });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ error: "Lỗi khi cập nhập tổng số bài viết" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
