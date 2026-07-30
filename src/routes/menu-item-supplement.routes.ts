import { Router } from "express";

import {
  createMenuItemSupplement,
  getMenuItemSupplements,
  getMenuItemSupplement,
  getSupplementsByMenuItem,
  updateMenuItemSupplement,
  deleteMenuItemSupplement,
} from "../controllers/menu-item-supplement.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/check-role.middleware.js";

const router = Router();

// Associer un supplément à un menu (Cashier)
router.post(
  "/",
  authMiddleware,
  checkRole("cashier"),
  createMenuItemSupplement
);

// Voir toutes les associations (Cashier)
router.get(
  "/",
  authMiddleware,
  checkRole("cashier"),
  getMenuItemSupplements
);

// Voir les suppléments d'un menu (Cashier + Tablet)
router.get(
  "/menu-item/:menuItemId",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getSupplementsByMenuItem
);

// Voir une association (Cashier)
router.get(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  getMenuItemSupplement
);

// Modifier une association (Cashier)
router.patch(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  updateMenuItemSupplement
);

// Supprimer une association (Cashier)
router.delete(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  deleteMenuItemSupplement
);

export default router;