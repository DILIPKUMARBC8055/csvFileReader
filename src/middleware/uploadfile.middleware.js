import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), "public"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileUpload = multer({
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error("Only CSV files are allowed!"), false);
    }
    cb(null, true);
  },
  storage: storage,
});

export default fileUpload;
