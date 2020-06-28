import * as express from "express";
import pgPromise from "pg-promise";
import OktaJwtVerifier from "@okta/jwt-verifier";
import axios from "axios";

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

//   const OktaJwtVerifier = require('@okta/jwt-verifier');
  const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: process.env.OKTA_CLIENT_ID,
    issuer: `${process.env.OKTA_BASE_URL}`,
  });


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

  app.get("/test", async (req: any, res) => {
    try {
        if (!req.headers.authorization) throw new Error('Authorization header is required');

        const accessToken = req.headers.authorization.trim().split(' ')[1];
        await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
        axios.get(`${process.env.OKTA_BASE_URL}/v1/userinfo`,  {
            headers: { Authorization: `Bearer ${accessToken}` },
        }).then(
            (response) => {
                res.json(response.data.name);
            }
        )
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error.message);
        res.json(error.message);
      }
  });
};
