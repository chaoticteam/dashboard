import "@/styles/globals.css";
import { useMemo, useReducer } from "react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import conttext from "@/context/siteContext"
import {initialState, reducer} from "@/reducers"
import {Layout} from "@/components"
import App from "next/app";
import { useRouter } from "next/router";


export function CustomApp({ Component, pageProps }: AppProps) {
  const {route} = useRouter();
  const [state,dispatch]= useReducer(reducer,initialState);
	useMemo(()=>{
		return {state,dispatch}
	},[state,dispatch]);
  let content = (
    <Layout>
        <Component {...pageProps} />
      </Layout>
  )
  if (/(\/login|\/signup)/.test(route)){
    content = (<Component {...pageProps} />)
  }
  return (
    <conttext.Provider value={{state,dispatch}}>
      <div className="background-site"></div>
      {content}
    </conttext.Provider>
  )
}

export default CustomApp;
