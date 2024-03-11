import Link from "next/link";
import React from "react";
import Avatar from "../Avatar";
import { IUser } from "@/models";

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>{
  user?:IUser;
  HandleLogout: ()=>Promise<void>
}
export default function Navbar(props:IProps) {
  const {
    user,
    HandleLogout,
    ...cssProps
  } =props;
  return (
    <nav className="navbar" {...cssProps}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"/></svg>
      <Link href="/">Dashboard</Link>
      <Avatar photo={user?.profile.photo}>
        {!!user?<ul>
          <li><Link href="/profile">Profile</Link></li>
          <li onClick={HandleLogout}>Sign out</li>
        </ul>:
        <ul>
          <li><Link href="/profile">Sign in</Link></li>
        </ul>}
      </Avatar>
      <style jsx>{`
        .navbar{
          display: grid;
          grid-template-columns: 3rem 1fr 3rem;
          align-items: center;
          padding: 0 1rem;
        }
        .navbar a:hover {
          background-color: #00000069;
          color: white;
        }
      `}</style>
    </nav>
  );
}
