import { CSSProperties, useState } from "react";
import styles from './index.module.css'

interface IProps{
  photo?:string;
  children: JSX.Element;
  style?: CSSProperties;
}

export default function Avatar(props:IProps){
  const {photo,children,style} = props
  const [open,setOpen] = useState(false);
  let Image = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44.05 44.05 0 0 1 44 44m60 8A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88.09 88.09 0 0 0-91.47-87.93C77.43 41.89 39.87 81.12 40 128.25a87.65 87.65 0 0 0 22.24 58.16A79.71 79.71 0 0 1 84 165.1a4 4 0 0 1 4.83.32a59.83 59.83 0 0 0 78.28 0a4 4 0 0 1 4.83-.32a79.71 79.71 0 0 1 21.79 21.31A87.62 87.62 0 0 0 216 128"/></svg>
  if (!!photo)
    Image = <div style={{
      backgroundImage: `url(${photo})`,
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      backgroundPosition: "top center",
      borderRadius:"50%",
      padding:"1rem",
      aspectRatio:"1/1",
    }}
    />
  return (
    <div className={styles.avatar} style={style} onClick={()=>setOpen(!open)}>
      {Image}
      <menu style={{display:open?"initial":"none"}}>
        {children}
      </menu>
      <div className={styles.background} style={{display:open?"initial":"none"}} onClick={()=>setOpen(!open)}></div>
    </div>
  )

}
