import { Router } from "express";

import {
  createTicket,
  getTickets,
  getTicket,
  getStatistics,
  deleteTicket
} from "../controllers/ticket.controller.js";

const router = Router();

// Créer un ticket
router.post("/", createTicket);

// Afficher tous les tickets
router.get("/", getTickets);
router.get(
  "/statistics",
  getStatistics
);
// Afficher un ticket par ID
router.get("/:id", getTicket);

// Supprimer un ticket
router.delete("/:id", deleteTicket);

export default router;