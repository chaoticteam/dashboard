import Link from "next/link";
import React, { CSSProperties, useState } from "react";

interface IProps extends CSSProperties{

}

export const SitBar=()=>{
  const [colapsed,setColapsed] = useState(false);
  return (
    <div className={`menu menu-${colapsed?"colapsed":"normal"}`}>
      <menu>
        <li><Link href="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"/></svg> Dashboard</Link></li>
      </menu>
      <ul>
        <li><a onClick={()=>setColapsed(!colapsed)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l1.4-1.4l-1.6-1.6H16v-2h-4.2l1.6-1.6L12 8l-4 4zm0 6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/></svg>colapsed</a></li>
      </ul>
    <style jsx>{`
      .menu{
        display: grid;
        grid-template-rows: 1fr 2rem;
        margin:0 1rem;
        padding: .75rem;
        height: 34rem;
        border-radius: .7rem;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 .5rem .5rem 0 rgba(0,0,0,0.19);
        background-color: var(--secondary);
        overflow: hidden;
      }
      .menu-colapsed{
        width: 3.5rem;
      }
      .menu-normal{
        z-index: inherit;
        width: fit-content;
      }
      .menu:is(.menu-colapsed) > ul > li > a > svg{
        transform: rotate(180deg);
      }
      menu{
        flex-direction: column;
        align-items: flex-start;
      }
      svg{
        width: 1.5rem;
        height: 1.5rem;
      }
      menu,ul,li {
        display: flex;
        padding: 0;
        width: 100%
      }
      li{
        align-items: center;
      }
      svg:first-child{
        margin-right:1rem;
      }
    `}</style>
    </div>
  )
}
