import { useContext } from "react";
import { popupContext } from "./PopupMenu";

const Menu = ({children}) =>{
    const {isExpand} = useContext(popupContext);

    return isExpand ? <div className="menucontainer shadow"> {children} </div> : null;
}

export default Menu;