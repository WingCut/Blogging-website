// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "blog-website",
//     allowedFormats: ["jpg", "png", "gif"],
//     transformation: [
//       { width: 1000, crop: "scale" },
//       { quality: "auto" },
//       { fetch_format: "auto" },
//     ],
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;
