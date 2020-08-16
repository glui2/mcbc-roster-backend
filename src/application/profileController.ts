import { HttpRequestHandler, CreateController } from "./controllerInterface";
import { Request, Response } from 'express';
import axios from "axios";

interface ProfileController {
    handleGetProfileRequest: HttpRequestHandler;
}

const createGetProfileRequest = () => {

}

const createProfileController: CreateController<ProfileController> = (): ProfileController => {
    return {
        handleGetProfileRequest: async (req: Request, res: Response): Promise<void> => {
            const oktaUserInfo = res.locals.user;
            const userProfile = {
                firstName: oktaUserInfo.given_name,
                lastName: oktaUserInfo.family_name,
            }

            res.send(userProfile);
        }
    }
}

export { createProfileController };