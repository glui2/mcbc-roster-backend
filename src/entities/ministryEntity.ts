import { Volunteer } from "./volunteerEntity";
import { MinistryData } from "../gateways/ministryGateway";

export interface Ministry {
    id: string,
    name: string,
}

export const createMinistryFromMinistryData = (ministryData: MinistryData): Ministry => {
    return Object.freeze({
        id: ministryData.id,
        name: ministryData.name,
    })
}