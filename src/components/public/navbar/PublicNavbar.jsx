import "./public-navbar.css";
import logo from '../../../assets/logo.jpg';
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";


const PublicNavbar = () =>{
    const [open,setOpen] = useState(false);
    
    return <>
        <header className='shadow'>
            <nav className='navbar bg-color'>
                <Link to='/public/home'>
                    <img src={logo} className='logo'/>
                </Link>
                <ul className={ open ? ['navbar-menu', 'active-menu','container'].join(' ') : ['navbar-menu'].join(' ')}>     
                {
                    open && <div className='mobile-menu-header'>
                                <h4>Menu</h4>
                                <p className='p-color'>Select your option</p>
                            </div>
                }               
                        <NavLink onClick={() => setOpen(prevValue =>  prevValue === true && false )} to='/public/home' className={({isActive})=>(isActive ? 'active-link' : '')}>
                            <li>Home </li>
                        </NavLink>
                        <NavLink onClick={() => setOpen(prevValue =>  prevValue === true && false )} to='/public/about' className={({isActive})=>(isActive ? 'active-link' : '')}>
                            <li>About </li>
                        </NavLink>
                        <NavLink onClick={() => setOpen(prevValue =>  prevValue === true && false )} to='/public/login' className={({isActive})=>(isActive ? 'active-link' : '')}>
                            <li>Login </li>
                        </NavLink>
                </ul>
                <div className='mobile-menu' onClick={()=> setOpen(!open)}>
                    {open ? <i className="bi bi-x-lg nav-menu-icon"></i> : <i className="bi bi-list nav-menu-icon"></i> } 
                </div>
            </nav>
        </header>
    </>
}

export default PublicNavbar