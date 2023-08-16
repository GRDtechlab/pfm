/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import './sidebar.css'

const Sidebar = (props) =>{
    const {currentUser:user} = props;    
    return (
        <>
                <div className= { props.open ? ['sidebar shadow','sidebar-show',' container'].join(' ') : ['sidebar shadow','container'].join(' ')}>
                    <div className="profile">
                        {props.open && <i className="bi bi-x-lg sidebar-close" onClick={()=> props.setOpen(false)}></i> }
                        <i className="bi bi-person-fill"></i>
                        <div className="profile-name">
                        <h4>{user?.firstname} {user?.lastname}</h4>
                        <p className='p-color'>{user?.occupation}</p>
                        <p className='email p-color'>{user?.email}</p>
                        </div>
                    </div>
                    <div className="menu">
                    <NavLink to='/' className={({isActive})=>(isActive ? 'active-link' : '')}> <i className="bi bi-house-fill"></i> Home </NavLink>
                        {/* <a href="#"> <i className="bi bi-house-fill"></i> Home</a> */}
                        {/* <a href="#"> <i className="fa fa-newspaper-o"></i> List</a> */}
                        <NavLink to='/list' className={({isActive})=>(isActive ? 'active-link' : '')} ><i className="bi bi-list-check"></i>  List </NavLink>
                        <NavLink to='/transaction' className={({isActive})=>(isActive ? 'active-link' : '')} > <i className="bi bi-credit-card-fill"></i> Transaction</NavLink>
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