import "@/styles/globals.css";
import { useMemo, useReducer } from "react";
import type { AppProps } from "next/app";
import conttext from "@/context/siteContext"
import {initialState, reducer} from "@/reducers"
import {Layout, PacmanLoader} from "@/components"
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [state,dispatch]= useReducer(reducer,initialState);
	useMemo(()=>{
		return {state,dispatch}
	},[state,dispatch]);
  return (
    <conttext.Provider value={{state,dispatch}}>
      <Layout >
      <Component {...pageProps} />
      </Layout>
    </conttext.Provider>
  )
}
