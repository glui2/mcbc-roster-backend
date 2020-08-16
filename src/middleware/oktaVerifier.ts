import { Request, Response, NextFunction } from 'express';
import OktaJwtVerifier from "@okta/jwt-verifier";
import axios from "axios";
import { UNAUTHORIZED } from 'http-status-codes';

const createOktaVerifier = () => {
    const oktaJwtVerifier = new OktaJwtVerifier({
        clientId: process.env.OKTA_CLIENT_ID,
        issuer: `${process.env.OKTA_BASE_URL}`,
      });

    return {
        verifyRequest: async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.headers.authorization) throw new Error('Authorization header is required');

                const accessToken = req.headers.authorization.trim().split(' ')[1];
                await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
                const oktaResponse = await axios.get(`${process.env.OKTA_BASE_URL}/v1/userinfo`,  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })

                res.locals.user = oktaResponse.data;

                next();
            } catch (error) {
                console.log(error.message);
                res.status(UNAUTHORIZED);
                res.send(error.message);
            }
        }
    }
}

export { createOktaVerifier };