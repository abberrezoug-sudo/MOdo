import { Router } from "express";
import {
  createMenuItemSupplement,
  getMenuItemSupplements,
  getMenuItemSupplement,
  getSupplementsByMenuItem,
  updateMenuItemSupplement,
  deleteMenuItemSupplement,
} from "../controllers/menu-item-supplement.controller.js";

const router = Router();

router.post("/", createMenuItemSupplement);

router.get("/", getMenuItemSupplements);

router.get("/menu-item/:menuItemId", getSupplementsByMenuItem);

router.get("/:id", getMenuItemSupplement);

router.patch("/:id", updateMenuItemSupplement);

router.delete("/:id", deleteMenuItemSupplement);

export default router;