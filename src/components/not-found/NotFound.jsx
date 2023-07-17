import './not-found.css';
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const NotFound = () => {
    const navigate = useNavigate();
    return <>
        <div id="not-found" className='not-found'>
            <img src={logo} />
            <h1> 404 </h1>
            <h2 className='header-color'>OOps, The page you are looking for can not be found!</h2>
            <button className='btn btn-primary' onClick={() => navigate('/')} >Back Home</button>
        </div>
        
    </>
}

export default NotFound;