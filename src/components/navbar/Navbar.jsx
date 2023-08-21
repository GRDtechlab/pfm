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
    const [currentTheme,setCurrentTheme] = useState(localStorage.getItem('current-theme'));

    useEffect(() => {
        addPreferenceThemeOnLoad()
    }, [])

    const onLogout= async()=>{
        try{
            setOpen(prevValue =>  prevValue === true && false );
            const data = await onLoggedOut(user).unwrap();
            dispatch(logOut())
            navigate('/public/home');
        }catch(catchError){
            console.log(catchError)
        }
    }
    const addPreferenceThemeOnLoad =() =>{
        // let currentTheme = localStorage.getItem('current-theme');
        if(currentTheme === 'light'){
            document.documentElement.setAttribute('data-theme', 'light');
        }else{
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    const changeTheme = () =>{
        setCurrentTheme((currentTheme) => {
            // currentTheme = localStorage.getItem('current-theme');
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
            <ul className={ open ? ['navbar-menu', 'active-menu', 'container'].join(' ') : ['navbar-menu'].join(' ')}>
                
                    <NavLink onClick={() => setOpen(prevValue =>  prevValue === true && false )} to='/' className={({isActive})=>(isActive ? 'active-link' : '')}>
                        <li>Home </li>
                    </NavLink>
                
                <NavLink onClick={onLogout} to="/logout" className={({isActive})=>(isActive ? 'active-link' : '')}>
                    <li>Logout</li>
                </NavLink>
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