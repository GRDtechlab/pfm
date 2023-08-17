import './Navbar.css'

import { useEffect, useState } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import { useLogoutMutation } from '../../services/pfm-api';
import { useDispatch } from 'react-redux';
import { logOut } from '../../services/auth-slice';

const Navbar = ({...props}) => {
    const {user} = props;
    const [open,setOpen] = useState(false);
    const navigate= useNavigate();
    const [onLoggedOut] = useLogoutMutation();
    const dispatch = useDispatch();
    const [currentTheme,setCurrentTheme] = useState();

    useEffect(() => {
        changeTheme()
    }, [])

    const onLogout= async()=>{
        try{
            const data = await onLoggedOut(user).unwrap();
            dispatch(logOut())
            navigate('/public/login');
        }catch(catchError){
            console.log(catchError)
        }
    }

    const changeTheme = () =>{
        console.log('How many times changeTheme called...', currentTheme, localStorage.getItem('current-theme'))
        setCurrentTheme((currentTheme) => {
            currentTheme = localStorage.getItem('current-theme');
            setOpen(prevValue =>  prevValue === true && false )            
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
                <a onClick={onLogout}>
                    <li>Logout</li>
                </a>
                <li className='disabled'>
                    <div className='navmenu-seperator'></div>
                </li>
                <li onClick={changeTheme } > <i className="bi bi-moon"></i></li>
            </ul>
            <div className='mobile-menu' onClick={()=> setOpen(!open)}>
            {open ? <i className="bi bi-x-lg nav-menu-icon"></i> : <i className="bi bi-list nav-menu-icon"></i> } 
            </div>
        </nav>        
        </header>
    )
}

export default Navbar