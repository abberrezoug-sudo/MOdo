import "dotenv/config";

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING");

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
