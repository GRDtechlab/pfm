import { useState } from "react";

const Submenu = ({title, headicon, submenu_item}) =>{
    const [open, setOpen] =useState(false);

    const showSubmenu = () => setOpen(!open);

  return <>
    <h4 style={{paddingLeft:'0.5rem'}} onClick={showSubmenu}>
        {headicon} {title}
        {open ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i> }  
    </h4>
    {  open && submenu_item?.map((submenu, index) => (
        <div className='submenu' key={index}>
         <h5>{submenu}</h5>
        </div>
    )) 
    }
  </>  

}

export default Submenu;