const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const moment = require("moment");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    console.log(req.body.img);

    const uploadsPath = path.resolve("server", "uploads");
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }

    const id = req.body.id;
    const userDir = path.resolve("server", "uploads", id);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
    }
    callback(null, userDir);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);

    const now = moment().format("YYMMDD-hh:mm:ss");
    callback(null, basename + "-" + now + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

router.use((req, res, next) => {
  console.log("uploads 미들웨어 호출됨.");

  next();
});

router.post("/", upload.single("img"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log(req.file.filename);
});

module.exports = router;
