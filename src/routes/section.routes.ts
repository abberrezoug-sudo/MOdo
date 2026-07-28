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
const router = Router();
router.post(
  "/",
  upload.single("image"),
  validate(createSectionSchema),
  createSection
);

router.get("/", getSections);

router.get("/:id", getSection);

router.patch("/:id", updateSection);

router.delete("/:id", deleteSection);

export default router;