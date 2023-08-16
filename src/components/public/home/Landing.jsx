import './landing.css';
import { Link, NavLink, useNavigate } from "react-router-dom";
import landingImageOne from '../../../assets/landing-first-section.svg';
import landingImageTwo from "../../../assets/landing-first-section-two.svg"
import landingImageBank from "../../../assets/landing-first-bank.svg"
import landingImageThird from "../../../assets/landing-third-section.svg";

const Landing = () =>{
    const navigate = useNavigate();
    return <>
        <div className='landing-container '>
            <div className='first-section'>
                <div className="left-part">
                    <h1 className='header-color-dark'>Manage your Personal Finance easily.</h1>
                    <h3 className='header-color'>
                        Easily create your account and start managing your monthy expenses and more! You can manage and get track records of monthy savings target as well.
                    </h3>
                    <div className='action'>
                        <img className='ladingImageBank' src={landingImageBank} />
                        <button className='btn landing-btn' onClick={() => navigate('/public/login')} >Login</button>
                    </div>  
                </div>
                <div className="right-part display-none">
                    <img className='ladingImage' src={landingImageOne} />
                    <img className='ladingImageTwo' src={landingImageTwo} />
                </div>
            </div>
            <div className="second-section">
                <div className="center-text">
                    <h2 className='header-color-dark'>Manage dashboard easily as well!</h2>
                    <h3 className='header-color'>All the information related to your incomes and expenses are easily available at the dashboard.</h3>
                    <button className='btn landing-btn' onClick={() => navigate('/public/signup')}>Sign Up</button>
                </div>
            </div>
            
            <div className="third-section">
                <img src={landingImageThird} />
                <div className="center-text">
                    <h2 className='header-color-dark'>Available features that manages... </h2>
                    <ul className='feature-list'>
                        <li>
                            <i className="bi bi-check2-circle"></i>
                            <h4>Manage Dashboard </h4>
                        </li>
                        <li>
                            <i className="bi bi-check2-circle"></i>
                            <h4>Keep records of monthy savings</h4>
                        </li>
                        <li>
                            <i className="bi bi-check2-circle"></i>
                            <h4>Add Transaction</h4>
                        </li>
                        <li>
                            <i className="bi bi-check2-circle"></i>
                            <h4>Store your banks details </h4>
                        </li>
                    </ul>
                    
                </div>
                
            </div>
            <div className="third-section">
                <div className="center-text">
                        <h3 className='bi color-primary-dark'>Contact Us:</h3>
                       <h4 className="bi header-color-dark">Gaurang Dhorda</h4>
                       <h4 className='header-color'><i className="bi bi-envelope-at-fill"></i>grdtechlab@gmail.com</h4> 
                       
                </div>
                
                <div className='center-text'>
                    <h3 className='bi color-primary-dark'>Links:</h3>
                    <NavLink to='/public/about' className={({isActive})=>(isActive ? 'active-link' : '')}>
                        <h4 className='bi header-color footer-link'>About Us</h4>
                    </NavLink>
                    <NavLink to='/public/login' className={({isActive})=>(isActive ? 'active-link' : '')}>
                        <h4 className='bi header-color footer-link'>Login</h4>
                    </NavLink>
                    <NavLink to='/public/signup' className={({isActive})=>(isActive ? 'active-link' : '')}>
                        <h4 className='bi  header-color footer-link'>Sign Up</h4>
                    </NavLink>
                </div>

            </div>
        </div>
    </>
}

export default Landing