import { useEffect, useState } from 'react'
import logo from '../../assets/logo.jpg'
import './Navbar.css'

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
        <header>
        <nav className='navbar'>
            <img src={logo} className='logo'/>
            
            <ul className={ open ? ['navbar-menu', 'active-menu'].join(' ') : 'navbar-menu'}>
                <li><a href='#'>Home </a></li>
                <li><a>About</a></li>
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