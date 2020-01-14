exports.seed = async knex => {
  await knex("projects").insert([
    {
      name: "complete front end module",
      description: "learn about HTML, CSS, JS, and React",
      is_completed: true
    },
    {
      name: "complete node db sprint challenge",
      description:
        "finish project MVP to build a Data Model and a RESTful API that stores data into a Relational Database",
      is_completed: true
    },
    {
      name: "apply for jobs",
      description:
        "apply for front end, back end, or fullstack developer positions with a current resume, portfolio, cover letter, etc.",
      is_completed: false
    }
  ]);
};
