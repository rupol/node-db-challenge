const db = require("../data/db-config");

function get(id) {
  let query = db("resources");

  if (id) {
    query.where({ id }).first();
  }

  return query;
}

async function add(resource) {
  const [id] = await db("resources").insert(resource);
  return db("resources")
    .where({ id })
    .first();
}

module.exports = {
  get,
  add
};
