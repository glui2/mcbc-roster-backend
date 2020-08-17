import { GetProfileRequestInterface } from "./getProfileRequestInterface"
import { Volunteer, createVolunteerFromVolunteerData } from "../../entities/volunteerEntity";
import { volunteers, ministries } from '../../mock-data';

const getProfile = (request: GetProfileRequestInterface): Volunteer => {

    const volunteerData = volunteers.find((volunteer) => volunteer.id === request.volunteerId);

    const ministryList = volunteerData.assignedMinistries.map((ministryId) => ministries.find((ministry) => ministry.id === ministryId));

    return createVolunteerFromVolunteerData(volunteerData, ministryList);
}

export { getProfile }