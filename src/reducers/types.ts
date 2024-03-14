import {IUser,IUserStatus, Profile, Telephone } from "@/models";
interface ISetUserAction {
	type: "SET_USER";
	payload?: IUser;
}
interface ISetProfileAction {
	type: "SET_PROFILE";
	payload: Profile;
}
interface IAddTelephoneAction {
	type: "ADD_TELEPHONE";
	payload: Telephone;
}
interface IRMTelephoneAction {
	type: "RM_TELEPHONE";
	payload: number;
}
interface ISetStatusAction {
	type: "SET_STATUS_INSTANCE";
	payload: IUserStatus;
}


export type IAction = ISetUserAction | ISetStatusAction | ISetProfileAction |IAddTelephoneAction |IRMTelephoneAction;
export default IAction;
