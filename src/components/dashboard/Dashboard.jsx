import {  useState } from 'react';
import Modal from '../modal/modal';
import './dashboard.css';
import Updatedashboard from '../update-dashboard/Updatedashboard';
import currency_formater from '../../Utils/currency-formatter';

const Dashboard =() => {
    const [showModal,setShowModal] = useState(false);

    const [dashboardData, setDashboardData] =useState({total_savings:5300, salary_pm:19930, limit_pm:2000, availableBalance:8000})
    const month = ['January','February','March','April','June','July','August', 'September','October','November','December'];
    const currentMonth = month[new Date().getMonth() - 1];
    const currentYear = new Date().getFullYear();

    const onSubmit = (dashboardUpdateData) =>{
            console.log('handle submit called ', dashboardUpdateData)
            setDashboardData(dashboardUpdateData)
    }

    return <>
    <div className='main-dashboard'>
        <div className="head-title">
            <div className="left">
                <h1 className='header-color'>Dashboard</h1>
            </div>
            
            <a href="#" className="btn-download">
                <i className="bx bxs-cloud-download"></i>
                <span className="text">Download_PDF</span>
            </a>
        </div>
        <div className='action-header'>
        <h3 className='header-color'> {currentMonth} {currentYear} </h3>
            <i className='bi bi-plus add' onClick={()=>{setShowModal(true)}}></i>
            <Modal  open={showModal} setOpen={setShowModal} title='Update' content = {<Updatedashboard  dashboardData={dashboardData} onSubmit={onSubmit} closeModal={setShowModal} />} />
                        
        </div>
        <ul className="box-info">
            <li>
            <i className="bx bi bi-piggy-bank-fill"></i>
            <span className="text">
                <h3> {currency_formater.format(dashboardData.total_savings)} </h3>
                <p className='p-color'>Total Savings</p>
            </span>
            </li>
            <li>
            <i className="bx bi bi-bar-chart-line-fill light-orage-color"></i>
            <span className="text">
                 <h3>{currency_formater.format(dashboardData.limit_pm)}</h3> {/* <i className="bi bi-currency-rupee"></i> */}
                <p className='p-color'>Limit p<span className='seperator'>/</span>m to be saved</p>
            </span> 
            {/* Per month limit to save */}
            </li>
            <li>
            <i className="bx bi bi-calendar2-fill light-green-color  "></i>
            <span className="text">
                <h3> {currency_formater.format(dashboardData.salary_pm)}</h3>
                <p className='p-color'>Salary p<span className='seperator'>/</span>m</p>
            </span>
            </li>
            <li>
            <i className="bx bi bi-wallet-fill light-yellow-color "></i>
            <span className="text">
                <h3>{currency_formater.format(dashboardData.availableBalance)}</h3>
                <p className='p-color'>Current Balance</p>
            </span>
            </li>
        </ul>

    </div>
    </>
}

export default Dashboard;