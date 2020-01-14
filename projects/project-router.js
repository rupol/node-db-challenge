const express = require("express");

const projects = require("./project-model");

const router = express.Router({
  mergeParams: true
});

router.get("/", (req, res, next) => {
  projects
    .get()
    .then(projects => {
      res.json(projects);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  const projectData = req.body;

  projects
    .add(projectData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id/tasks", (req, res, next) => {
  const { id } = req.params;
  projects
    .getProjectTasks(id)
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      next(error);
    });
});

router.post("/:id/tasks", (req, res, next) => {
  const { id } = req.params;
  const taskData = {
    project_id: id,
    description: req.body.description,
    notes: req.body.notes,
    is_completed: req.body.is_completed || false
  };

  projects
    .addProjectTask(id, taskData)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
