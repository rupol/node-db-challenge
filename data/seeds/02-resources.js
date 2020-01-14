exports.seed = async knex => {
  await knex("resources").insert([
    {
      name: "computer",
      description: "a functioning mac or pc with an internet connection"
    },
    {
      name: "myself",
      description: "me, I, as opposed to you"
    },
    {
      name: "class notes",
      description:
        "detailed notes from lectures, online resouces, projects, etc."
    }
  ]);
};
