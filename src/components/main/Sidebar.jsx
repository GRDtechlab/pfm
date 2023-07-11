/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = (props) =>{    
    return (
        <>
                <div className= { props.open ? ['sidebar','sidebar-show',' container'].join(' ') : ['sidebar','container'].join(' ')}>
                    <div className="profile">
                        {props.open && <i className="bi bi-x-lg sidebar-close" onClick={()=> props.setOpen(false)}></i> }
                        <i className="bi bi-person-fill"></i>
                        <div className="profile-name">
                        <h4>Gaurang Dhorda</h4>
                        <p className='p-color'>Software Developer</p>
                        <p className='email p-color'>grdtechlab@gmail.com</p>
                        </div>
                    </div>
                    <div className="menu">
                    <Link to='/'> <i className="bi bi-house-fill"></i> Home </Link>
                        {/* <a href="#"> <i className="bi bi-house-fill"></i> Home</a> */}
                        {/* <a href="#"> <i className="fa fa-newspaper-o"></i> List</a> */}
                        <Link to='/list'> List </Link>
                        <a href="#"> <i className="fa fa-bar-chart-o"></i> Performance</a>
                        <a href="#"> <i className="fa fa-bookmark-o"></i> Bookmarks</a>
                        <a href="#"> <i className="fa fa-envelope-o"></i> Message</a>
                        <a href="#"> <i className="fa fa-cog"></i> Settings</a>
                    </div>
                </div>
                <div className= {props.open ? ['backdrop','show-backdrop'].join(' ') : 'backdrop' } onClick={()=> props.setOpen(false)} ></div>
            
        </>
    )
}

export default Sidebar