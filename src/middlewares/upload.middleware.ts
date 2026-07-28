import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter(req, file, cb) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "image/gif",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Unsupported image format."));
    }

    cb(null, true);
  },
});

export default upload;