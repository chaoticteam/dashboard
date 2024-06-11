import Link from "next/link";
import React, { CSSProperties, useState } from "react";
import { Arrow, Dashboard } from "..";

interface IProps extends CSSProperties{

}

export const SitBar=()=>{
  const [colapsed,setColapsed] = useState(false);
  return (
    <div className={`menu menu-${colapsed?"colapsed":"normal"}`}>
      <menu>
        <li><Link href="/"><Dashboard />Dashboard</Link></li>
      </menu>
      <ul>
        <li><a onClick={()=>setColapsed(!colapsed)}> <Arrow style={{transform:colapsed?"rotate(180deg)":"",transition: "transform 1s"}} />colapsed</a></li>
      </ul>
    <style jsx>{`
      .menu {
        display: grid;
        grid-template-rows: 1fr 2rem;
        padding: .75rem;
        height: 34rem;
        border-radius: .7rem;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 .5rem .5rem 0 rgba(0,0,0,0.19);
        background-color: var(--primary);
        overflow: hidden;
      }
      .menu-colapsed {
        width: 3.5rem;
      }
      .menu-normal {
        z-index: inherit;
        width: fit-content;
      }
      .menu:is(.menu-colapsed) > ul > li > a svg:first-child {
        transform: rotate(180deg);
      }
      menu {
        flex-direction: column;
        align-items: flex-start;
      }
      menu,ul,li {
        display: flex;
        padding: 0;
        width: 100%
      }
      li {
        align-items: center;
        margin: .5rem 0;
      }
      `}</style>
    <style>{`
      svg {
        margin-right: 1rem;
      }
    `}</style>
    </div>
  )
}
