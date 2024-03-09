import { AxiosInstance } from "axios";
export interface IUser {
	id: number;
	userName: string;
	email: string;
	verified: boolean;
  profile: Profile
}
export interface IUserSignup extends IUser{
  confirmPassword: string;
}

export interface Profile {
	firstName: string;
	lastName: string;
	photo: string;
	bio: string;

	jobs: string;

	linkedin: string;
	github: string;
// pending
	gitlab: string;
	discord: string;
//
	twitter: string;
	facebook: string;
	instagram: string;
	youtube: string;
	website: string;

// pending delete
	images: string[];
//
  specialties: string;
  skills: string;
  Languages: string;
  Hobbies: string;

telephone: {
	id: number;
	phoneNumber: string;
	whatsapp: boolean;
	countryCode: string;
}[];

}
export interface IUserAuth{
	user: IUser;
	token: string;
}
export type IUserStatus ="loading" | "loaded" | "error";
export interface IContextState {
	user?: IUser;
	status: IUserStatus;
	axiosInstance: AxiosInstance;
  token?: string;
}

