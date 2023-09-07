import { useContext, useEffect, useRef, useState } from "react";
import { popupContext } from "./PopupMenu";

const Menu = ({children}) =>{
    const {isExpand} = useContext(popupContext);
    const menuRef = useRef()

    useEffect(() =>{
        if(isExpand){
            let clientWidth = menuRef.current?.clientWidth;
            menuRef.current.style.left = `calc(100% - ${clientWidth}px)`;
        }
    })

    return isExpand ? <div className="menucontainer shadow" ref={menuRef}> {children} </div> : null;
}

export default Menu;