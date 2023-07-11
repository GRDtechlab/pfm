import { Suspense, useState } from 'react';
import { lazy } from 'react';
import Sidebar from './Sidebar';
import './main.css'

const Dashboard = lazy(() => import('../dashboard/Dashboard' /*webpackChunkName: "Dashboard-Lazy-Load"*/));

const Main = ({data}) => {
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
                <Suspense fallback={<h1 className='ml-3'>Content is Loading...</h1>}>
                    <Dashboard data={data} />
                </Suspense>
        </main>
            
        </>
    )
}

export default Main;