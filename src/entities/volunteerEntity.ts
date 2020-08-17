import { Ministry, createMinistryFromMinistryData } from "./ministryEntity";
import { VolunteerData } from "../gateways/volunteerGateway";
import { MinistryData } from "../gateways/ministryGateway";

export interface Volunteer {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    assignedMinistries: Ministry[]
}

export const createVolunteerFromVolunteerData = (volunteerData: VolunteerData, ministryList: MinistryData[]): Volunteer => {
    return Object.freeze({
        id: volunteerData.id,
        firstName: volunteerData.firstName,
        lastName: volunteerData.lastName,
        email: volunteerData.email,
        mobileNumber: volunteerData.mobileNumber,
        assignedMinistries: ministryList.map((ministry) => createMinistryFromMinistryData(ministry))
    })
}