import { Router } from "express";
import { createRestaurant, getRestaurant, } from "../controllers/restaurant.controller.js";
import upload from "../middlewares/upload.middleware.js";
const router = Router();
router.post("/", upload.single("image"), createRestaurant);
router.get("/", getRestaurant);
export default router;
//# sourceMappingURL=restaurant.routes.js.map