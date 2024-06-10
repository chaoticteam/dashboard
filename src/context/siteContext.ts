import React	from "react";
import { IContextState as State} from "@/models/user";
import IAction from "@/reducers/types";
import { initialState } from "@/reducers";

interface IContextState{
		state: State;
		dispatch?: React.Dispatch<IAction>
}
const siteContex =React.createContext<IContextState>({state:initialState});

export default siteContex;
