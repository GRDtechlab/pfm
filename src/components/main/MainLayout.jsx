import './main.css'

import {  useState, useRef, useEffect } from 'react';

import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { useGetCurrentUser } from '../../services/get-current-logged-in-user-hook';
import { useIsUserLoggedInMutation } from '../../services/pfm-api';
import { setCredintials } from '../../services/auth-slice';
import { useDispatch } from 'react-redux';

const MainLayout = () => {
    const mainElementRef = useRef();
    const [open,setOpen] = useState(false);
    const [checkUserIsLoggedIn] = useIsUserLoggedInMutation()
    const currentUser = useGetCurrentUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isHide,setIsHide] = useState(false);

    const onCheckUserIsLoggedIn = async () =>{
        if(!currentUser){
            try{
                const data = await checkUserIsLoggedIn().unwrap();
                console.log({data})
                dispatch(setCredintials(data.auth))
            }catch(catchError){
                 navigate("/public/home")
            }
        }
    }

    useEffect(() => {
        console.log('use-effect calling....')
        onCheckUserIsLoggedIn()
    },[])
    
    return(
        <> {currentUser && <div className='container'>
        <Navbar user={currentUser}/>
        {!isHide && <Sidebar open={open} setOpen={setOpen} currentUser={currentUser}/> }

        <main ref={mainElementRef} className='main container'>
            <div className='menu-with-main header-color'>
                <div className='mobile-sidebar-menu-icon' onClick={()=> setOpen(!open)}>
                    <i className="bi bi-list"></i>
                </div>
            </div>
            <Outlet context={{ someData: setIsHide, mainRef:mainElementRef, user:currentUser }}/>  {/* Outlet here all routes loads... */}
        </main>
            {/* <Footer/> */}
    </div>}       
                
        </>
    )
}

export default MainLayout;