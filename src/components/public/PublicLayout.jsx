import { Outlet } from 'react-router-dom';
import './public.css';
import PublicNavbar from './navbar/PublicNavbar';

const PublicLayout = () => {
    return <>
    <div className='container'>
        <PublicNavbar/>
        <main className='public-main container'>
            <Outlet/>
        </main>
    </div>
    </>
}

export default PublicLayout;