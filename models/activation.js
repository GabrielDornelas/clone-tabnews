import database from 'infra/database';
import email from 'infra/email.js';
import webserver from 'infra/webserver.js';
import { NotFoundError } from "infra/errors";

const EXPIRATION_IN_MILISECONDS = 60 * 15 * 1000 //15 min

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILISECONDS)

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO
          user_activation_tokens (user_id, expires_at)
        VALUES
          ($1, $2)
        RETURNING
          *
      ;`,
      values: [userId, expiresAt]
    })

    return results.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
    await email.send({
        from: "FinTab <contato@fintab.com.br>",
        to: user.email,
        subject: "Ative seu cadastro no FinTab !",
        text: `${user.username}, clique no link abaixo para ativar seu cadastro no FinTab:
${webserver.origin}/cadastro/ativar/${activationToken.id}
`
    })
}

async function findOneByEmail(email) {
  const token = email.text.match(/\/cadastro\/ativar\/([^\s]+)/);
  return token ? token[1] : null
}

async function findOneValidById(tokenId) {
  const tokenObject = await runSelectQuery(tokenId);
  return tokenObject;

  async function runSelectQuery(tokenId) {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          user_activation_tokens
        WHERE
          id = $1
          AND used_at IS NULL
          AND expires_at > NOW()
        LIMIT 1
      ;`,
      values: [tokenId]
    })
    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O token de ativação utilizado não foi encontrado no sistema ou expirou.",
        action: "Faça um novo cadastro.",
      });
    }
    return results.rows[0] || null;
  }
}

const activation = {
  create,
  findOneByEmail,
  sendEmailToUser,
  findOneValidById,
}

export default activation;
