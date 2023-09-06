import './popupmenu.css';
import Header from './Header';
import Menu from './Menu';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export const popupContext = createContext();
const {Provider} = popupContext;

const PopupMenu =({children}) =>{
    const [isExpand, setIsExpand] = useState(false)
    const menuRef = useRef()
    const handleExpand = () => setIsExpand( prev => !prev)
    const values = {isExpand, handleExpand}

    useEffect(() => {
        const closeMenu = (e) =>{
            if(!menuRef.current.contains(e.target)) setIsExpand(false)
        }
        document.addEventListener("mousedown", closeMenu)

        return() =>{
            document.removeEventListener("mousedown", closeMenu)
        }
    })

    return <div className='popupContainer' ref={menuRef} >
        <Provider value={values}>
            {children}
        </Provider>
    </div>
}

PopupMenu.Header = Header;
PopupMenu.Menu = Menu;

export default PopupMenu;