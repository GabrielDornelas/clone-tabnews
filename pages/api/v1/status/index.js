import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  let postgresVersion = await database.query("SHOW server_version");
  postgresVersion = postgresVersion.rows[0].server_version;

  let maxConnections = await database.query("SHOW max_connections;");
  maxConnections = parseInt(maxConnections.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  let usedConnections = await database.query({
    text: "SELECT COUNT(*)::int AS total_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  usedConnections = parseInt(usedConnections.rows[0].total_connections);
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersion,
        max_connections: maxConnections,
        used_connections: usedConnections,
      },
    },
  });
}

export default status;
