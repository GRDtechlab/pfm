import './main.css'

import {  useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Main = () => {
    const [open,setOpen] = useState(false)

    return(
        <>
            <div className='container'>
                <Navbar/>
                <Sidebar open={open} setOpen={setOpen}/>
        
                <main className='main container'>
                    <div className='menu-with-main header-color'>
                        <div className='mobile-sidebar-menu-icon' onClick={()=> setOpen(!open)}>
                            <i className="bi bi-list"></i>
                        </div>
                    </div>
                    <Outlet/>  {/* Outlet here all routes loads... */}
                </main>
                    <Footer/>
            </div>    
        </>
    )
}

export default Main;