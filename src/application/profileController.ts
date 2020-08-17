import { HttpRequestHandler, CreateController } from "./controllerInterface";
import { Request, Response } from 'express';
import { GetProfileRequestInterface } from "../useCases/getProfile/getProfileRequestInterface";
import { GetProfileResponseInterface } from "../useCases/getProfile/getProfileResponseInterface";
import { Volunteer } from "../entities/volunteerEntity";
import { getProfile } from "../useCases/getProfile/getProfileInteractor";

interface ProfileController {
    handleGetProfileRequest: HttpRequestHandler;
}

const createGetProfileRequest = (id: string): GetProfileRequestInterface => {
    if (!id) {
        throw new Error('No id provided');
    };
    return {
        volunteerId: id
    }
}

const createGetProfileResponse = (volunteer: Volunteer): GetProfileResponseInterface => {
    const ministries = volunteer.assignedMinistries.map((ministry) =>  { return {id: ministry.id, name: ministry.name }});

    return {
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        ministries
    }
}

const createProfileController: CreateController<ProfileController> = (): ProfileController => {
    return {
        handleGetProfileRequest: async (req: Request, res: Response): Promise<void> => {
            const getProfileRequest = createGetProfileRequest(req.params.id);

            const volunteer = getProfile(getProfileRequest);

            res.send(createGetProfileResponse(volunteer));
        }
    }
}

export { createProfileController };