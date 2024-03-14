import { IContextState } from "@/models/user";
import { IAction } from "@/reducers/types";

export const initialState: IContextState = {
  user: undefined,
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
		default:
			return state;
	}
}
