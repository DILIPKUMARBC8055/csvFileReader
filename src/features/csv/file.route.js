// Import Express framework
import express from "express";

// Import FileController for handling file-related requests
import FileController from "./file.controller.js";

// Import fileUpload middleware for handling file uploads
import fileUpload from "../../middleware/uploadfile.middleware.js";

// Create a new Express Router instance
const fileRouter = express.Router();

// Create an instance of FileController
const csvfile = new FileController();

// Define routes for handling file-related requests
fileRouter.get("/", csvfile.homepage); // Route for displaying the homepage
fileRouter.get("/upload",  csvfile.showfiles);//Route to display the files uploaded
fileRouter.post("/upload", fileUpload.single("file"), csvfile.fileSaved); // Route for uploading a CSV file
fileRouter.get("/upload/:filename", csvfile.displayData); // Route for displaying data from a CSV file

// Export the fileRouter for use in other modules
export default fileRouter;
