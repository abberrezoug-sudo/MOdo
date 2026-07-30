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

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/check-role.middleware.js";

const router = Router();

// Créer un menu (Cashier)
router.post(
  "/",
  authMiddleware,
  checkRole("cashier"),
  upload.single("image"),
  createMenuItem
);

// Voir tous les menus (Cashier + Tablet)
router.get(
  "/",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getMenuItems
);

// Voir les menus d'une section (Cashier + Tablet)
router.get(
  "/section/:sectionId",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getMenuItemsBySection
);

// Voir un menu (Cashier + Tablet)
router.get(
  "/:id",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getMenuItem
);

// Modifier un menu (Cashier)
router.patch(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  upload.single("image"),
  updateMenuItem
);

// Supprimer un menu (Cashier)
router.delete(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  deleteMenuItem
);

export default router;