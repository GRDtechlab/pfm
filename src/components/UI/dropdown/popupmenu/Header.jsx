import { useContext } from "react";
import { popupContext } from "./PopupMenu";

const Header = ({children})=>{
    const {handleExpand}= useContext(popupContext);
        
    return <>
               <div onClick={handleExpand}> 
                    {children}
               </div>
            </>
}

export default Header;