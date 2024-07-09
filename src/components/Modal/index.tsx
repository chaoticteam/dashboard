// @src/components/Modal.jsx

import React, { useCallback } from "react";
import styles from "./Modal.module.css";
import styled from "styled-components";

const RiCloseLine = (props: React.SVGProps<SVGSVGElement>)=> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16M9.879 8.464L12 10.586l2.121-2.122a1 1 0 1 1 1.415 1.415l-2.122 2.12l2.122 2.122a1 1 0 0 1-1.415 1.415L12 13.414l-2.121 2.122a1 1 0 0 1-1.415-1.415L10.586 12L8.465 9.879a1 1 0 0 1 1.414-1.415"/></g></svg>
  )
}
const Footer = styled.div`

  display: flex;
  input{
    display: flex;
    border: none;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    margin: 4px 2px;
    cursor: pointer
  }
  input[type=button][value=ok]{
    background-color: #04AA6D;
  }
  input[type=button][value=close]{
    background-color: #505050;
  }
  input[type=button][value=ok]:active{
    background-color: #066b46;
  }
  input[type=button][value=close]:active{
    background-color: #272727;
  }
  input[type=button][value=ok]:hover{
    background-color: #23ca8d;
  }
  input[type=button][value=close]:hover{
    background-color: #6e6c6c;
  }
`

interface iprops{
		children:React.ReactElement;
		onClose?: ()=>void;
    handleOk?: ()=>void|Promise<void>;
		show?: boolean;
		title: string;
}

interface ModalProps extends React.FC<iprops>  {
  Footer: typeof Footer;
}

export const Modal: ModalProps= (props) => {
    const {title,show,children,handleOk,onClose} = props
		if (!show)
				return null
		return (
				<>
				<div className={styles.darkBG} onClick={onClose} />
				<div className={styles.centered}>
						<div className={styles.modal}>
						<div className={styles.modalHeader}>
								{/* header */}
								<h5 className={styles.heading}>{title}</h5>
						</div>
						<RiCloseLine className={styles.closeBtn} onClick={onClose}/>
						<div className={styles.modalContent}>
								{/* Body */}
								{children}
						</div>
						</div>
				</div>
				</>
		);
};

Modal.Footer = Footer;
