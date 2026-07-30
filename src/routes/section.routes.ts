import { Router } from "express";

import {
  createSection,
  getSections,
  getSection,
  updateSection,
  deleteSection,
} from "../controllers/section.controller.js";

import upload from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createSectionSchema } from "../validators/section.validator.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/check-role.middleware.js";

const router = Router();

// Créer une section (Cashier)
router.post(
  "/",
  authMiddleware,
  checkRole("cashier"),
  upload.single("image"),
  validate(createSectionSchema),
  createSection
);

// Voir toutes les sections (Cashier + Tablet)
router.get(
  "/",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getSections
);

// Voir une section (Cashier + Tablet)
router.get(
  "/:id",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getSection
);

// Modifier une section (Cashier)
router.patch(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  updateSection
);

// Supprimer une section (Cashier)
router.delete(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  deleteSection
);

export default router;