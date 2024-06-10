import "@/styles/globals.css";
import { useMemo, useReducer } from "react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import conttext from "@/context/siteContext"
import {initialState, reducer} from "@/reducers"
import {Layout} from "@/components"
import axios from "axios";
import getConfig from "next/config";
import App from "next/app";

const {publicRuntimeConfig} = getConfig()
const API_URL = publicRuntimeConfig.API_URL

interface AppOwnProps {
  layout: boolean;
}

export function CustomApp({ Component, pageProps, layout }: AppProps & AppOwnProps) {
  const [state,dispatch]= useReducer(reducer,initialState);
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = API_URL
	useMemo(()=>{
		return {state,dispatch}
	},[state,dispatch]);
  if (layout){
    return (
      <conttext.Provider value={{state,dispatch}}>
        <div className="background-site"></div>
        <Component {...pageProps} />
      </conttext.Provider>
    )
  }
  return (
    <conttext.Provider value={{state,dispatch}}>
      <div className="background-site"></div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </conttext.Provider>
  )
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);
  let layout: boolean;
  layout = /(\/login|\/signup)/.test(context.router.route);
  return { ...ctx, layout }
}

export default CustomApp;
