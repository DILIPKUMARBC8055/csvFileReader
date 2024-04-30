// Importing required packages
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from .env file
import express from "express"; // Import Express framework
import ejs from "ejs"; // Import EJS templating engine
import bodyParser from "body-parser"; // Import body-parser middleware for parsing request bodies
import fileRouter from "./src/features/csv/file.route.js"; // Import router for file-related routes
import ApplicationError from "./src/errorhandling/customerror.error.js"; // Import custom error handling middleware
import expressEjsLayouts from "express-ejs-layouts"; // Import Express-EJS layouts for rendering EJS templates with layouts
import path from "path"; // Import path module for working with file paths

// Initializing Express server
const server = express();

// Middleware
server.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
server.use(express.static(path.join(path.resolve(), "src", "public"))); // Serve static files from the "public" directory
server.use(express.json()); // Parse JSON bodies
server.use(expressEjsLayouts); // Use EJS layouts for rendering views
server.set("views", path.join(path.resolve(), "src", "views")); // Set views directory
server.set("view engine", "ejs"); // Set EJS as the default view engine

// Routes
server.use("/", fileRouter); // Mount file-related routes on the root path

// Error handling middleware
server.use((err, req, res, next) => {
  if (err) {
    if (err instanceof ApplicationError) {
      // If the error is an instance of ApplicationError
      return res.status(err.code).send(err.message); // Send error message with appropriate status code
    }
    return res.status(500).send(err.message); // Otherwise, send generic error message with status code 500
  }
  next(); // Continue to the next middleware
});
//handling other reqestes
server.use((req, res) => {
  res.send(
    "API not found only api are supported is '/','/upload','/upload/filename' for more info on documentation"
  );
});

// Start the server
server.listen(process.env.PORT1, async () => {
  console.log("Server is listening at the port:" + process.env.PORT1); // Log server start message with port number
});
