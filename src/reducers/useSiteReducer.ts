import { IContextState } from "@/models/user";
import { IAction } from "@/reducers/types";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const baseURL = publicRuntimeConfig.API_URL;

export const initialState: IContextState = {
  status:"loading",
  user: undefined,
  axiosInstance: axios.create({
      baseURL:baseURL,
  }),
};
export const reducer = (state: IContextState, action:IAction ): IContextState => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				status: "loaded",
				user : action.payload,
			};
		case "SET_AXIOS_INSTANCE":
			return {
				...state,
				axiosInstance : action.payload,
			};
    case "SET_STATUS_INSTANCE":
      return {
        ...state,
        status:action.payload
      }
		default:
			return state;
	}
}
