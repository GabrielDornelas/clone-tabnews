import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";
import session from "models/session.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const sessionToken = request.cookies.session_id;

  const sessionObject = await session.findOneValidByToken(sessionToken);
  const renewedSessionObject = await session.renew(sessionObject.id);
  controller.setSessionCookie(renewedSessionObject.token, response);
  const userFound = await user.findOneById(sessionObject.user_id);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1bf8e86 (fix: handle cache)
  response.setHeader(
    "Cache-Control",
    "no-store, no-cache, max-age=0, must-revalidate",
  );
<<<<<<< HEAD
=======
>>>>>>> bfab0b4 (feat: implement `/api/v1/user` endpoint with session renewal)
=======
>>>>>>> 1bf8e86 (fix: handle cache)
  return response.status(200).json(userFound);
}
