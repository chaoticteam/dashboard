import React from "react";
import { SitBar, Footer, PacmanLoader } from "..";
import { useAuth } from "@/hooks";
import Avatar from "@/components/Avatar";
import Link from "next/link";

interface IProps{
  children: React.ReactNode
}
export function Layout({children}:IProps){
  const {state:{status,user},logout} = useAuth();
  if (status == "loading"){
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
  if (!!user){
    return (
    <>
      {/* <NavBar user={state.user} HandleLogout={logout} /> */}
      <div className="layout">
        <SitBar />
        {children}
        <Avatar style={{position:"absolute",top:0,right:0,height:"3rem",width:"3rem"}} photo={user?.profile.photo}>
        {!!user?<ul>
          <li><Link href="/profile">Profile</Link></li>
          <li onClick={logout}>Sign out</li>
        </ul>:
        <ul>
          <li><Link href="/profile">Sign in</Link></li>
        </ul>}
      </Avatar>
        {/* <Footer /> */}
      </div>
    </>
    )
  }
  return (
    <div className="layout">
      {children}
    </div>
  )
}
