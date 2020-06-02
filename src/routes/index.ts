import * as express from "express";

export const register = ( app: express.Application ) => {
    const oidc = app.locals.oidc;

   // define a secure route handler
   app.get( "/roster", oidc.ensureAuthenticated(), ( req: any, res ) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    res.render( "roster", { isAuthenticated: req.isAuthenticated(), user } );
} );
};