const express = require("express");
const helmet = require("helmet");

const ProjectRouter = require("./projects/project-router");
const ResourceRouter = require("./resources/resource-router");

const server = express();
const port = process.env.PORT || 4000;

server.use(helmet());
server.use(express.json());

server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourceRouter);

server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found"
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occurred, please try again later"
  });
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
