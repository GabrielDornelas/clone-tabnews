import database from 'infra/database';
import email from 'infra/email.js';
import webserver from 'infra/webserver.js';

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
        ;
      `,
      VALUES: [userId, expiresAt]
    })

    return results.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
    await email.send({
        from: "FinTab <contato@fintab.com.br>",
        to: user.email,
        subject: "Ative seu cadastro no Fintab !",
        text: `${user.username}, clique no link abaixo para ativar seu cadastro no FinTab:
${webserver.origin}/cadastro/ativar/${activationToken.id}
`
    })
}

const activation = {
  create,  
  sendEmailToUser
}

export default activation;
