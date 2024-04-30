import ApplicationError from "../../errorhandling/customerror.error.js";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
export default class FileController {
  async homepage(req, res) {
    try {
      res.render("uploadfile");
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
  async fileSaved(req, res) {
    try {
      console.log(req.file.originalname);
      if (!req.file || req.file.length === 0) {
        res.status(400).json({ message: "No files were uploaded" });
      } else {
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
      throw new ApplicationError(error, 500);
    }
  }
  async displayData(req, res) {
    try {
      const filename = req.params.filename;

      const results = [];
      // const data = fs.readFileSync(
      //  ,
      //   "utf-8"
      // );
      // console.log(data);

      fs.createReadStream(
        path.join(path.resolve(), "public", filename.toString())
      )
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          res.render("showdata", { data: results });
        });
    } catch (error) {
      throw new ApplicationError(error, 500);
    }
  }
}
