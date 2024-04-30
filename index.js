import dotenv from "dotenv";
dotenv.config();

import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import fileRouter from "./src/features/csv/file.route.js";

import ApplicationError from "./src/errorhandling/customerror.error.js";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(path.resolve(), "src", "public")));
server.use(express.json());
server.use(expressEjsLayouts);
server.set("views", path.join(path.resolve(), "src", "views"));
server.set("view engine", "ejs");
server.use("/", fileRouter);

server.use((err, req, res, next) => {
  if (err) {
    if (err instanceof ApplicationError) {
      return res.status(err.code).send(err.message);
    }
    return res.status(500).send(err.message);
  }
  next();
});

server.listen(process.env.PORT, async () => {
  console.log("Server is listening at the port:" + process.env.PORT);
});
