module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  taskToBody
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  const result = {
    ...project,
    is_completed: intToBoolean(project.is_completed)
  };

  if (project.tasks) {
    result.tasks = project.tasks.map(task => ({
      ...task,
      is_completed: intToBoolean(task.is_completed)
    }));
  }

  return result;
}

function taskToBody(task) {
  return {
    ...task,
    is_completed: intToBoolean(task.is_completed)
  };
}
