import { Router } from "express";
import {
  getUsers,
  getUserById,
  getUserName,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

const requireKey = (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (key === "secret123") {
    // let them in
    next();
  } else {
    // send 401 + message
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/:id/name", getUserName);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", requireKey, deleteUser);

export default router;