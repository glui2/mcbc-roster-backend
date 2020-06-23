import * as express from "express";
import pgPromise from "pg-promise";

export const register = (app: express.Application) => {
  const oidc = app.locals.oidc;
  const port = parseInt(process.env.PGPORT || "5432", 10);
  const config = {
    database: process.env.PGDATABASE || "mcbc-db",
    host: process.env.PGHOST || "localhost",
    port,
    user: process.env.PGUSER || "postgres",
  };

  const pgp = pgPromise();
  const db = pgp(config);

  // define a secure route handler
  app.get("/user/:id", async (req: any, res) => {
    try {
      const userId = `%${req.params.search}%`;
      const user = await db.one(
        `
            SELECT
                id
                , first_name
                , last_name
            FROM    user
            WHERE   user_id = $[userId]`,
        { userId, search: `%${req.params.search}%` }
      );
      return res.json(user);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      res.json({ error: err.message || err });
    }
  });

  app.get("/test", oidc.ensureAuthenticated(), async (req: any, res) => {
    try {
      // tslint:disable-next-line:no-console
      console.log(req);
      return res.json("Gavin");
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
      res.json({ error: err.message || err });
    }
  });
};
