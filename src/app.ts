import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import restaurantRoutes from "./routes/restaurant.routes.js";
import sectionRoutes from "./routes/section.routes.js";

import menuItemRoutes from "./routes/menu-item.routes.js";
import supplementRoutes from "./routes/supplement.routes.js";
import menuItemSupplementRoutes from "./routes/menu-item-supplement.routes.js";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));


app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Le Bon Goût API"
  });
});
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/supplements", supplementRoutes);
app.use(
  "/api/menu-item-supplements",
  menuItemSupplementRoutes
);
export default app;