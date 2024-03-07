import React, { useEffect } from "react";
import NavBar from "../NavBar";
import { Footer, PacmanLoader } from "..";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

interface IProps{
  children: React.ReactNode
}
export function Layout({children}:IProps){
  const {state} = useAuth();
  switch (state.status){
    case "loaded":
      return (
        <div className="layout">
          <NavBar user={state.user} />
          {children}
          <Footer />
        </div>
      )
    case "loading":
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
      default:
        return (
          <div className="layout">
            {children}
          </div>
        )
    }

}
