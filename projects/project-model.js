const db = require("../data/db-config");
const mappers = require("../data/helpers/mappers");

function get(id) {
  let query = db("projects");

  if (id) {
    query.where({ id }).first();

    const promises = [query, this.getProjectTasks(id)];

    return Promise.all(promises).then(function(results) {
      let [project, tasks] = results;

      if (project) {
        project.tasks = tasks;

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

async function addProjectTask(projectId, task) {
  const [id] = await db("tasks").insert(task);
  return db("projects")
    .where({ id })
    .first();
}

module.exports = {
  get,
  add,
  getProjectTasks,
  addProjectTask
};
