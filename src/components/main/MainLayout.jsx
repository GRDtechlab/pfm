import './main.css'

import {  useState, useRef } from 'react';

import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const MainLayout = () => {
    const mainElementRef = useRef()
    const [open,setOpen] = useState(false) 
    const [isHide,setIsHide] = useState(false);

    return(
        <>
            <div className='container'>
                <Navbar/>
                {!isHide && <Sidebar open={open} setOpen={setOpen}/> }
        
                <main ref={mainElementRef} className='main container'>
                    <div className='menu-with-main header-color'>
                        <div className='mobile-sidebar-menu-icon' onClick={()=> setOpen(!open)}>
                            <i className="bi bi-list"></i>
                        </div>
                    </div>
                    <Outlet context={{ someData: setIsHide, mainRef:mainElementRef }}/>  {/* Outlet here all routes loads... */}
                </main>
                    <Footer/>
            </div>    
        </>
    )
}

export default MainLayout;