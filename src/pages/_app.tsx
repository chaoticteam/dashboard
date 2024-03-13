import "@/styles/globals.css";
import { useMemo, useReducer } from "react";
import type { AppProps } from "next/app";
import conttext from "@/context/siteContext"
import {initialState, reducer} from "@/reducers"
import {Layout} from "@/components"
import axios from "axios";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig()
const API_URL = publicRuntimeConfig.API_URL

export default function App({ Component, pageProps }: AppProps) {
  const [state,dispatch]= useReducer(reducer,initialState);
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = API_URL
	useMemo(()=>{
		return {state,dispatch}
	},[state,dispatch]);
  return (
    <conttext.Provider value={{state,dispatch}}>
      <div className="background-site"></div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </conttext.Provider>
  )
}
