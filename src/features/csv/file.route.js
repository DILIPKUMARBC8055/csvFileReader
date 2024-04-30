import express from "express";
import FileController from "./file.controller.js";
import fileUpload from "../../middleware/uploadfile.middleware.js";

const fileRouter = express.Router();
const csvfile = new FileController();
fileRouter.get("/", csvfile.homepage);
fileRouter.post("/upload", fileUpload.single("file"), csvfile.fileSaved);
fileRouter.get("/upload/:filename", csvfile.displayData);


export default fileRouter;
