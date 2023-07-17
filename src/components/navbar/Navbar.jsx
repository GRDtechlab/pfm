import './Navbar.css'

import { useEffect, useState } from 'react'
import {Link, NavLink} from 'react-router-dom';
import logo from '../../assets/logo.jpg'

const Navbar = () => {
    const [open,setOpen] = useState(false);
    const [currentTheme,setCurrentTheme] = useState(localStorage.getItem('current-theme'));

    useEffect(() => {
        changeTheme()
    }, [])

    const changeTheme = () =>{
        
        setCurrentTheme((currentTheme) => {
            
            if(currentTheme === 'light'){
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('current-theme','dark')
                return 'dark'
            }else{
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('current-theme','light')
                return 'light'
            }
        })
    }
    return (
        <header className='shadow'>
        <nav className='navbar'>
            <Link to='/'>
                <img src={logo} className='logo'/>
            </Link>
            <ul className={ open ? ['navbar-menu', 'active-menu'].join(' ') : 'navbar-menu'}>
                
                    <NavLink to='/' className={({isActive})=>(isActive ? 'active-link' : '')}>
                        <li>Home </li>
                    </NavLink>
                
                
                    <NavLink to="/about" className={({isActive})=>(isActive ? 'active-link' : '')}>
                        <li>About</li>
                    </NavLink>
                
                <li><a>Contact</a></li>
                <li><a>Login </a></li>
                <li className='disabled'>
                    <div className='navmenu-seperator'></div>
                </li>
                <li onClick={changeTheme } > <i className="bi bi-moon"></i></li>
            </ul>
            <div className='mobile-menu' onClick={()=> setOpen(!open)}>
            {open ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i> } 
            </div>
        </nav>        
        </header>
    )
}

export default Navbar