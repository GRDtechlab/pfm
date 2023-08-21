import { useOutletContext } from 'react-router-dom';
import './loader.css';
import { useEffect } from 'react';

const Loader = (props)=>{
    const {message} = props;
    const context = useOutletContext();

    useEffect(() => {
        context?.hideSidebar(true)
        return() =>{
            context?.hideSidebar(false)
        }
    },[])

    return <>
                <div className='loading-flex'>
                    {message && <h2>{message}...</h2> } 
                    <span className="loader"></span>
                    <h3 className='header-color-dark'>Loading...</h3> 
                </div>
    </>
}

export default Loader;