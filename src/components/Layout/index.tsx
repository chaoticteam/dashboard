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
            grid-template-columns: 1fr;
          }
          `}</style>
        </div>
      )
  }
  return (
  <>
    <div className="layout">
      <SitBar />
      <div className="page">
        {children}
        <Avatar style={{position:"absolute",top:"1rem",right:"1rem",height:"3rem",width:"3rem"}} photo={user?.profile.photo}>
          {!!user?<ul>
            <li><Link href="/profile">Profile</Link></li>
            <li onClick={logout}><a>Sign out</a></li>
          </ul>:
          <ul>
            <li><Link href="/profile">Sign in</Link></li>
          </ul>}
        </Avatar>
      </div>
    </div>
  </>
  )
}
