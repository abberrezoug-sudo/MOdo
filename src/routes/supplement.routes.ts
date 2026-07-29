import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  createSupplement,
  getSupplements,
  getSupplement,
  updateSupplement,
  deleteSupplement,
} from "../controllers/supplement.controller.js";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  createSupplement
);

router.get("/", getSupplements);

router.get("/:id", getSupplement);

router.patch(
  "/:id",
  upload.single("image"),
  updateSupplement
);

router.delete("/:id", deleteSupplement);

export default router;