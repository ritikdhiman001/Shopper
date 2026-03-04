import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
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

const routes = express.Router();

// Public
routes.post("/register", registerUser);
routes.post("/login", loginUser);

// Public read
routes.get("/clothes", getClothes);
routes.get("/clothes/:id", getClothesById);

// Admin only
routes.post("/clothes", authMiddleware, adminMiddleware, addClothes);
routes.put("/clothes/:id", authMiddleware, adminMiddleware, updateClothes);
routes.delete("/clothes/:id", authMiddleware, adminMiddleware, deleteClothes);
routes.get("/admin/users", authMiddleware, adminMiddleware, getUser);

export default routes;
