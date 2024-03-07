import React	from "react";
import { IContextState as State, IUser } from "@/models/user";
import IAction from "@/reducers/types";
import axios from "axios";
import getConfig from "next/config";

const {publicRuntimeConfig}= getConfig();
const API_URL = publicRuntimeConfig.API_URL;

interface IContextState{
		state: State;
		dispatch?: React.Dispatch<IAction>
}
const siteContex =React.createContext<IContextState>({state:{status:"loading",axiosInstance:axios.create({
  baseURL:API_URL,
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json',
  }
})}});

export default siteContex;
