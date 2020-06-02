import * as express from "express";

export const register = ( app: express.Application ) => {
    const oidc = app.locals.oidc;

   // define a secure route handler
   app.get( "/user/:id", oidc.ensureAuthenticated(), ( req: any, res ) => {
    const defaultUser = {
        firstName: "Gavin",
        lastName: "Lui"
    }
    return res.json(defaultUser);
} );
};