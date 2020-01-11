const express = require("express");

const projects = require("./project-model");

const router = express.Router({
  mergeParams: true
});

module.exports = router;
