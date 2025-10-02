const multer = require("multer");
const path = require("path");

// storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uplodes")); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

// middleware
const upload = multer({ storage });

module.exports = upload;
