import './Navbar.css'

import { useEffect, useState } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import { useLogoutMutation } from '../../services/pfm-api';
import { useDispatch } from 'react-redux';
import { logOut } from '../../services/auth-slice';
import PopupMenu from '../UI/dropdown/popupmenu/PopupMenu';

const Navbar = ({...props}) => {
    const {user} = props;
    const userProfileText = `${user?.firstname[0]}${user?.lastname[0]}`;
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
            <div style={{display:'flex', alignItems:'center'}}>
            <ul className={ open ? ['navbar-menu', 'active-menu', 'container'].join(' ') : ['navbar-menu'].join(' ')}>
                {
                    open && <div className='mobile-menu-header'>
                                <h4>Menu</h4>
                                <p className='p-color'>Select your option</p>
                            </div>
                }
                    <NavLink onClick={() => setOpen(prevValue =>  prevValue === true && false )} to='/' className={({isActive})=>(isActive ? 'active-link' : '')}>
                        <li>Home </li>
                    </NavLink>
                <li onClick={changeTheme } > <span>Theme</span> <i className="bi bi-moon"></i></li>
                {!open && <li className='disabled'>
                            <div className='navmenu-seperator'></div>
                          </li>
                }
                
                
            </ul>
            
                <div className='mobile-menu' onClick={()=> setOpen(!open)}>
                    {open ? <i className="bi bi-x-lg nav-menu-icon"></i> : <i className="bi bi-list nav-menu-icon"></i> } 
                </div>
               {!open &&  <ul style={{display:'flex', cursor:'pointer'}} >
                <PopupMenu>
                    <PopupMenu.Header>
                        <li>
                                <i className="bi bi-person-fill"></i>
                                <span title={`welcome ${user?.firstname}!`}>{userProfileText}
                                
                                </span>
                                  {/* <i className="bi bi-caret-down-fill"></i> */}
                        </li> 
                    </PopupMenu.Header>
                    <PopupMenu.Menu>
                        <div className='menu'>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <i className="bi bi-person-fill"></i>
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <span className='font-color'>{user?.firstname} {user?.lastname}</span>
                                        <span className='p-color'>{user?.email}</span>
                                    </div>
                                </div>
                                <hr className='hr'/>
                                <NavLink onClick={onLogout} to="/logout" className={({isActive})=>(isActive ? 'active-link' : '')}>
                                <i className="bi bi-power"></i>
                                    <span> Logout  </span>
                                </NavLink>
                        </div>
                    </PopupMenu.Menu>
                </PopupMenu>
                </ul>
                }
            </div>
        </nav>        
        </header>
    )
}

export default Navbar