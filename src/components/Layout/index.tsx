import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar";
import { Footer, PacmanLoader } from "..";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

interface IProps{
  children: JSX.Element
}
export function Layout({children}:IProps){
  const router =useRouter();
  let content = children;
  const {state} = useAuth();
  if (state.status == "loading"){
    content = <PacmanLoader />
  }
  useEffect(()=>{
    if(!state.user){
      router.push("/login");
    }
  },[])
  return (
    <div className="layout">
      <NavBar />
      {content}
      <Footer />
    </div>
  )
}
