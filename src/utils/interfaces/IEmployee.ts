import { Gender } from "../enums/common.enum";

export interface IEmployee {
  id?: number | string;
  firstName?: string;
  lastName?: string;
  number?: string;
  email?: string;
  photo?: string;
  gender?: Gender;
  createdAt?: string;
  updatedAt?: string;
}
