import { IContextState } from "@/models/user";
import { IAction } from "@/reducers/types";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const baseURL = publicRuntimeConfig.API_URL;

export const initialState: IContextState = {
  user: undefined,
  // axiosInstance: axios.create({
  //     baseURL:baseURL,
  //     withCredentials: true,
  // }),
};
export const reducer = (state: IContextState, action:IAction ): IContextState => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				status: "loaded",
				user : action.payload,
			};
		// case "SET_TOKEN":
    //   state.axiosInstance.interceptors.request.use(config=>{
    //     if (config.headers)
    //       config.headers.Authorization =	action.payload ? `Bearer ${action.payload}` : ''
    //     return config
    //   })
		// 	return {
		// 		...state,
    //     token:action.payload,
		// 		axiosInstance: state.axiosInstance,
		// 	};
    case "SET_STATUS_INSTANCE":
      return {
        ...state,
        user:undefined,
        status:action.payload
      }
		default:
			return state;
	}
}
