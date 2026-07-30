import { Router } from "express";

import {
  createTicket,
  getTickets,
  getTicket,
  getStatistics,
  deleteTicket,
} from "../controllers/ticket.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/check-role.middleware.js";

const router = Router();

// Créer un ticket (Tablet uniquement)
router.post(
  "/",
  authMiddleware,
  checkRole("tablet"),
  createTicket
);

// Voir tous les tickets (Cashier uniquement)
router.get(
  "/",
  authMiddleware,
  checkRole("cashier"),
  getTickets
);

// Statistiques (Cashier uniquement)
router.get(
  "/statistics",
  authMiddleware,
  checkRole("cashier"),
  getStatistics
);

// Voir une facture (Cashier + Tablet)
router.get(
  "/:id",
  authMiddleware,
  checkRole("cashier", "tablet"),
  getTicket
);

// Supprimer une facture (Cashier uniquement)
router.delete(
  "/:id",
  authMiddleware,
  checkRole("cashier"),
  deleteTicket
);

export default router;