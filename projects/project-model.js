const db = require("../data/db-config");
const mappers = require("../data/helpers/mappers");

function get(id) {
  let query = db("projects");

  if (id) {
    query.where({ id }).first();

    const promises = [
      query,
      this.getProjectTasksShort(id),
      this.getProjectResources(id)
    ];

    return Promise.all(promises).then(function(results) {
      let [project, tasks, resources] = results;

      if (project) {
        project.tasks = tasks;
        project.resources = resources;

        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  }

  return query.then(projects => {
    return projects.map(project => mappers.projectToBody(project));
  });
}

async function add(project) {
  const [id] = await db("projects").insert(project);
  return db("projects")
    .where({ id })
    .first();
}

function getProjectTasks(projectId) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .where({ project_id: projectId })
    .select(
      "t.id",
      "p.name as project_name",
      "p.description as project_description",
      "t.description",
      "t.notes",
      "t.is_completed"
    )
    .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}

function getProjectTasksShort(projectId) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .where({ project_id: projectId })
    .select("t.id", "t.description", "t.notes", "t.is_completed")
    .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}

function getProjectResources(projectId) {
  return db("resources as r")
    .join("projects_resources as pr", "pr.resource_id", "r.id")
    .join("projects as p", "pr.project_id", "p.id")
    .where({ project_id: projectId })
    .select("r.id", "r.name", "r.description", "r.description")
    .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}

async function addProjectTask(projectId, task) {
  const [id] = await db("tasks").insert(task);
  return db("tasks")
    .where({ id })
    .first();
}

module.exports = {
  get,
  add,
  getProjectTasks,
  getProjectTasksShort,
  getProjectResources,
  addProjectTask
};
