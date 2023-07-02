import { useState } from 'react';
import Sidebar from './Sidebar';
import './main.css'
import Dashboard from '../dashboard/Dashboard';
const Main = () => {
    const [open,setOpen] = useState(false)

    return(
        <>
        <Sidebar open={open} setOpen={setOpen}/>
        <main className='main container'>
                <div className='menu-with-main header-color'>
                    <div className='mobile-sidebar-menu-icon' onClick={()=> setOpen(!open)}>
                        <i className="bi bi-list"></i>
                    </div>
                </div>
                <Dashboard/>
        </main>
            
        </>
    )
}

export default Main;