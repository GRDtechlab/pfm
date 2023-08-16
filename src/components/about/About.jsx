import './about.css';
import {useOutletContext} from 'react-router-dom';
import about from '../../assets/about.svg';
import { useEffect } from 'react';

const About = () =>{
    // const { someData:hideSidebar, mainRef:mainElementRef } = useOutletContext();

    // useEffect(() => {

    //     hideSidebar(true);
    //     mainElementRef.current.classList.add('hide-sidebar');
    //     mainElementRef.current.getElementsByClassName('menu-with-main')[0].classList.add('show-icon-menu')
    //     return () => {
    //         hideSidebar(false);
    //         mainElementRef.current.classList.remove('hide-sidebar');
    //         mainElementRef.current.getElementsByClassName('menu-with-main')[0].classList.remove('show-icon-menu')
    //     }
    // },[])

    return <>
        <section>
            <div className='left'>
            <img src={about} />
            </div>
            <div className="right">
                <div className='about-header'>
                <h1 className='header-color w-100'>About Us</h1>
                <h3 className='p-color w-100'>Personal Finance Management</h3>
                </div>
                <div className='about-content'>
                    <h3 className='color-danger'>Manages About:</h3>
                    <ol className='ml-1'>
                        <li>Your total savings</li>
                        <li>Shows current balance</li>
                        <li>Manages your bank details</li>
                    </ol>
                </div>
            </div>
        </section>
    </>
}

export default About;