import * as express from "express";
import pgPromise from "pg-promise";
import OktaJwtVerifier from "@okta/jwt-verifier";
import { createProfileController } from "../application/profileController";
import { Request, Response } from 'express';

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

  const profileController = createProfileController();

  app.get("/profile/:id", async (req: Request, res: Response) => {
    profileController.handleGetProfileRequest(req, res);
  });

};
