import React	from "react";
import { IContextState as State, IUser } from "@/models/user";
import IAction from "@/reducers/types";
interface IContextState{
		state: State;
		dispatch?: React.Dispatch<IAction>
}

const siteContex =React.createContext<IContextState>({state:{status: "loading",}});

export default siteContex;
