import { ministries } from "../mock-data";
import { createMinistryFromMinistryData } from "./ministryEntity";

describe('ministryEntity', () => {
    it('should return a valid Ministry object using given data', () => {
        const ministryData = ministries[0];
        const expected = {
            id: "1",
            name: "Worship"
        };

        const actual = createMinistryFromMinistryData(ministryData);

        expect(actual).toHaveProperty("id", expected.id);
        expect(actual).toHaveProperty("name", expected.name);
    });
})