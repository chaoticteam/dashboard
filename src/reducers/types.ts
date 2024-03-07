import {IUser,IUserStatus } from "@/models";
import { AxiosInstance } from "axios";
interface ISetUserAction {
	type: "SET_USER";
	payload: IUser;
}
interface ISetAxiosAction {
	type: "SET_AXIOS_TOKEN";
	payload: string;
}
interface ISetStatusAction {
	type: "SET_STATUS_INSTANCE";
	payload: IUserStatus;
}


export type IAction = ISetUserAction | ISetAxiosAction | ISetStatusAction;
export default IAction;
