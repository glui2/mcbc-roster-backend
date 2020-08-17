import { Ministry } from "./ministryEntity";

export interface Role {
    id: string,
    name: string,
    ministry: Ministry
}