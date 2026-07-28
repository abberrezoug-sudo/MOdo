import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  createMenuItem,
  getMenuItems,
  getMenuItem,
  getMenuItemsBySection,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menu-item.controller.js";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  createMenuItem
);

router.get("/", getMenuItems);

router.get("/section/:sectionId", getMenuItemsBySection);

router.get("/:id", getMenuItem);

router.patch(
  "/:id",
  upload.single("image"),
  updateMenuItem
);

router.delete("/:id", deleteMenuItem);

export default router;