import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 0 + 0 as sum;");
  console.log(result);
  response.status(200).json({ chave: "primeira API" });
}

export default status;
