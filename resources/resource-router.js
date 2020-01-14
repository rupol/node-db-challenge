const express = require("express");

const resources = require("./resource-model");

const router = express.Router({
  mergeParams: true
});

router.get("/", (req, res, next) => {
  resources
    .get()
    .then(resources => {
      res.json(resources);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  resources
    .get(id)
    .then(resource => {
      res.json(resource);
    })
    .catch(error => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  const resourceData = req.body;

  resources
    .add(resourceData)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
