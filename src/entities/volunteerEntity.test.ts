import { volunteers, ministries } from "../mock-data";
import { Volunteer, createVolunteerFromVolunteerData } from "./volunteerEntity";

describe('volunteerEntity', () => {
    it('should return a valid Volunteer object using given data', () => {
        const volunteerData = volunteers[0];
        const ministryData = [ministries[0]];
        const expected =  {
            id: "1",
            firstName: "Tom",
            lastName: "Wolf",
            email: "tom@email.com",
            mobileNumber: "0421947685",
            assignedMinistries: [{
                id: "1",
                name: "Worship",
            }]
        }

        const actual = createVolunteerFromVolunteerData(volunteerData, ministryData);

        expect(actual).toHaveProperty("id", expected.id);
        expect(actual).toHaveProperty("firstName", expected.firstName);
        expect(actual).toHaveProperty("lastName", expected.lastName);
        expect(actual).toHaveProperty("email", expected.email);
        expect(actual).toHaveProperty("mobileNumber", expected.mobileNumber);
        expect(actual).toHaveProperty("assignedMinistries");
        expect(actual.assignedMinistries).toHaveLength(1);
        expect(actual.assignedMinistries).toEqual(expect.arrayContaining(expected.assignedMinistries));

    });
})