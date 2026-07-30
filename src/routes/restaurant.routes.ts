import { Router } from "express";

import {
  createRestaurant,
  getRestaurant,
} from "../controllers/restaurant.controller.js";

import upload from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/check-role.middleware.js";

const router = Router();

// Créer ou modifier les informations du restaurant (Cashier)
router.post(
  "/",
  authMiddleware,
  checkRole("cashier"),
  upload.single("image"),
  createRestaurant
);

// Consulter les informations du restaurant (Cashier + Tablet)
router.get(
  "/",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getRestaurant
);

export default router;