import { IContextState } from "@/models/user";
import { IAction } from "@/reducers/types";
import axios from "axios";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig()
const API_URL = publicRuntimeConfig.API_URL

export const initialState: IContextState = {
  user: undefined,
  axiosInstance: axios.create({
    baseURL: API_URL,
    headers:{
      "Accept" : 'application/json',
      'Content-Type' : 'application/json',
      'ProXy-AuthoriZation': 'Rear Test',
    },
    withCredentials: true,
  })
};
export const reducer = (state: IContextState, action:IAction ): IContextState => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				status: "loaded",
				user : action.payload,
			};
    case "SET_PROFILE":
      if (!state.user) return state
      return {
        ...state,
        user:{
          ...state.user,
          profile:action.payload
        }
      }
    case "ADD_TELEPHONE":
      if (!state.user) return state
      return {
        ...state,
        user:{
          ...state.user,
          profile:{
            ...state.user.profile,
            telephone:[
              ...state.user.profile.telephone,
              action.payload
            ]
          }
        }
      }
    case "RM_TELEPHONE":
      if (!state.user) return state
      const telephones =state.user.profile.telephone.filter(item=>item.id!=action.payload)
      return {
        ...state,
        user:{
          ...state.user,
          profile:{
            ...state.user.profile,
            telephone:telephones
          }
        }
      }
    case "SET_STATUS_INSTANCE":
      return {
        ...state,
        user:undefined,
        status:action.payload
      }
    case "SET_STATUS_AXIOSINSTANCE":
      return {
        ...state,
        axiosInstance: action.payload,
      }
		default:
			return state;
	}
}
