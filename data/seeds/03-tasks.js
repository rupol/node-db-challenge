exports.seed = async knex => {
  await knex("tasks").insert([
    {
      description: "design the data model",
      notes: "resources, projects, tasks",
      is_completed: true,
      project_id: 1
    },
    {
      description: "build the endpoints",
      notes: "adding and retrieving resources, projects, and tasks",
      is_completed: true,
      project_id: 1
    },
    {
      description: "test the endpoints",
      notes:
        "test the endpoints to ensure the correct data is being sent, added, and retrieved",
      is_completed: true,
      project_id: 1
    },
    {
      description: "submit pull request",
      notes: "submit pull request",
      is_completed: true,
      project_id: 1
    },
    {
      description: "complete stretch goals",
      notes: "if there's time left over, move on to stretch goals",
      is_completed: false,
      project_id: 1
    }
  ]);
};
