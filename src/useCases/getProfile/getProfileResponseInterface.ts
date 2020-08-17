export interface MinistryResponse {
    id: string,
    name: string
}

export interface GetProfileResponseInterface {
    firstName: string,
    lastName: string,
    ministries: MinistryResponse[]
}