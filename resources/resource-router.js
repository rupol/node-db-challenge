const express = require("express");

const resources = require("./resource-model");

const router = express.Router({
  mergeParams: true
});

module.exports = router;
