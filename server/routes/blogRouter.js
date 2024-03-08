import { Router } from "express";
import { createBlog } from "../controllers/blogController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/create-blog", verifyJWT, createBlog);

export default router;
