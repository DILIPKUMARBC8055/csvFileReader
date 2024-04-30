// Import necessary modules
import ApplicationError from "../../errorhandling/customerror.error.js";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

// Define FileController class
export default class FileController {
  // Method to render the homepage
  async homepage(req, res) {
    try {
      res.render("uploadfile");
    } catch (error) {
      // Handle errors
      throw new ApplicationError(error, 500);
    }
  }

  // Method to handle file upload
  async fileSaved(req, res) {
    try {
      console.log(req.file.originalname);

      // Check if file exists
      if (!req.file || req.file.length === 0) {
        res.status(400).json({ message: "No files were uploaded" });
      } else {
        // Read the uploaded file
        fs.readFile(
          path.join(path.resolve(), "public", req.file.originalname.toString()),
          "utf8",
          (err, data) => {
            if (err) {
              return res.status(500).json({ error: "Error reading file" });
            }
            // Replace ';' with ',' in the file content
            const modifiedData = data.replace(/;/g, ",");
            // Write modified content back to the file
            fs.writeFile(
              path.join(
                path.resolve(),
                "public",
                req.file.originalname.toString()
              ),
              modifiedData,
              (err) => {
                if (err) {
                  return res.status(500).json({ error: "Error writing file" });
                }
              }
            );
          }
        );
        // Files were uploaded successfully
        fs.readdir(path.join(path.resolve(), "public"), (err, files) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            // Render the HTML page with the list of file names
            res.render("listfiles", { files: files });
          }
        });
      }
    } catch (error) {
      // Handle errors
      throw new ApplicationError(error, 500);
    }
  }
  async showfiles(req, res) {
    try {
      fs.readdir(path.join(path.resolve(), "public"), (err, files) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          // Render the HTML page with the list of file names
          res.render("listfiles", { files: files });
        }
      });
    } catch (error) {
      // Handle errors
      throw new ApplicationError(error, 500);
    }
  }

  // Method to display data from a CSV file
  async displayData(req, res) {
    try {
      // Get filename from request parameters
      const filename = req.params.filename;
      const results = [];

      // Read the CSV file and parse data
      fs.createReadStream(
        path.join(path.resolve(), "public", filename.toString())
      )
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          // Render the HTML page with the data
          res.render("showdata", { data: results });
        });
    } catch (error) {
      // Handle errors
      throw new ApplicationError(error, 500);
    }
  }
}
