import React	from "react";
import { IContextState as State} from "@/models/user";
import IAction from "@/reducers/types";
import getConfig from "next/config";

const {publicRuntimeConfig}= getConfig();
const API_URL = publicRuntimeConfig.API_URL;

interface IContextState{
		state: State;
		dispatch?: React.Dispatch<IAction>
}
const siteContex =React.createContext<IContextState>({state:{status:"loading",}});

export default siteContex;
