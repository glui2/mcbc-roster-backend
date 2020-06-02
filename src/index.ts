import dotenv from "dotenv";
import express from "express";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";

// initialise configuration
dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

// Configure session auth
sessionAuth.register( app );

// Configure routes
routes.register( app );

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});