import React from "react";
import NavBar from "../NavBar";
import { Footer, PacmanLoader } from "..";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

interface IProps{
  children: React.ReactNode
}
export function Layout({children}:IProps){
  const {state} = useAuth();
  if (state.status == "loading"){
    return (
      <div className="layout">
          <PacmanLoader />
          <style jsx>{`
          .layout{
            grid-template-rows: 1fr;
          }
          `}</style>
        </div>
      )
  }
  if (state.status == "loaded"){
    return (
      <div className="layout">
        <NavBar user={state.user} />
        {children}
        <Footer />
      </div>
    )
  }
  return (
    <div className="layout">
      {children}
    </div>
  )
}
