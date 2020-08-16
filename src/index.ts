import dotenv from "dotenv";
import express from "express";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";
import cors from "cors";
import { createOktaVerifier } from "./middleware/oktaVerifier";

// initialise configuration
dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

// Configure Express to parse incoming JSON data
app.use( express.json() );

// Enable cors for all requests
app.use(cors());

// Authenticate all requests
app.use(createOktaVerifier().verifyRequest);

// Configure routes
routes.register( app );

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});