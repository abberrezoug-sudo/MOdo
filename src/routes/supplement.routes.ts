import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";

import {
  createSupplement,
  getSupplements,
  getSupplement,
  updateSupplement,
  deleteSupplement,
} from "../controllers/supplement.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/check-role.middleware.js";

const router = Router();

// Créer un supplément (Cashier)
router.post(
  "/",
  authMiddleware,
  checkRole("cashier"),
  upload.single("image"),
  createSupplement
);

// Voir tous les suppléments (Cashier + Tablet)
router.get(
  "/",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getSupplements
);

// Voir un supplément (Cashier + Tablet)
router.get(
  "/:id",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getSupplement
);

// Modifier un supplément (Cashier)
router.patch(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  upload.single("image"),
  updateSupplement
);

// Supprimer un supplément (Cashier)
router.delete(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  deleteSupplement
);

export default router;