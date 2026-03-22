import express from "express";
import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/user/userController.js";
import {
  addClothes,
  getClothes,
  getClothesById,
  updateClothes,
  deleteClothes,
} from "../controller/clothes/clotheController.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { overviewData } from "../controller/overview/overview.js";

const routes = express.Router();

// Public
routes.post("/register", registerUser);
routes.post("/login", loginUser);

// Public read
routes.get("/clothes", getClothes);
routes.get("/clothes/:id", getClothesById);

// Admin only
routes.post("/clothes", upload.single("image"), addClothes);
routes.put(
  "/clothes/:id",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  updateClothes,
);
routes.delete("/clothes/:id", authMiddleware, adminMiddleware, deleteClothes);
routes.get("/admin/users", authMiddleware, adminMiddleware, getUser);
routes.delete("/admin/user/:id", authMiddleware, adminMiddleware, deleteUser);
routes.put("/admin/user/:id", authMiddleware, adminMiddleware, updateUser);

routes.get(
  "/admin/overviewdata",
  authMiddleware,
  adminMiddleware,
  overviewData,
);

export default routes;
