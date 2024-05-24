/* eslint-disable react/prop-types */
import '../../dashboard/dashboard.css';
import {  useDashboardDataQuery } from "../../../services/pfm-api";
import Modal from "../../modal/modal";
import AddDashboard from "../add/AddDashboard";
import UpdateDashboard from '../update/UpdateDashboard';

import currency_formater from "../../../Utils/currency-formatter";
import Info from '../../UI/info/Info';
import useConfirm from '../../modal/confirm/ConfirmProvider';
import BarChart from '../../chart/bar/BarChart';

const DashboardList = ({data, user}) =>{
    const confirm = useConfirm();
    const {dashboardData} = useDashboardDataQuery({user_id:user._id}, {
        // At present this is not required but for reference I added this selectFromResult...
        // Here selectFromResult is used to find out alredy availale data from api. In our case we called data from Main.jsx,
        // then we used this data and add condition to check if its array of not then we need only object of that data.
        selectFromResult:({data})=>{
            if(!Array.isArray(data)){
                data = [];
            }
            if( data.length !== 0) {
                return {dashboardData: data[0]}
            }else{
                return {dashboardData:data}
            }
        }
    })

    const month = ['January','February','March','April','May','June','July','August', 'September','October','November','December'];
    // const currentMonth = month[new Date().getMonth() - 1];
    const currentMonth = month[new Date().getMonth()];
    const currentYear = new Date().getFullYear();

    const onAdd = async () => {
        const isConfirm = confirm({title: 'Add New Record', component: Modal, content: AddDashboard})
    }

    const onEdit = async () => {
        const isConfirm = confirm({title:'Update', component:Modal, content: UpdateDashboard, dashboardData:dashboardData})
    }
    
    if(data && data.length === 0){
        return <div>
                    <Info title={'No Dashboard data found'} desctiption={'Add Record First'}>
                        <button className='btn btn-primary' onClick={onAdd}>Add New Record</button>
                    </Info>
                </div>
    }

    return (data && data.length !== 0) && <>
    <div className='main-dashboard'>
        {console.log({data}, ' dashboard')}
        <div className="head-title">
            <div className="left">
                <h1 className='header-color-dark'>Dashboard </h1>
            </div>
                <a href="#" className="btn btn-primary shadow">
                <i className="bx bxs-cloud-download"></i>
                <span className="text">Download PDF</span>
            </a>
        </div>
        <div className='action-header'>
            <h3 className='header-color'> {currentMonth} {currentYear} </h3>
            <i className='bi bi-pencil add' title='Edit Dashboard Record' onClick={onEdit}></i>
        </div>
        <div className='p-color'  style={{display:'flex', gap:'8px'}} >Last Updated: <h4 className='p-color' title='DD/MM/YYYY - HH:MM:SS am/pm format'> {new Date(dashboardData.updatedAt).toLocaleDateString()} - <span> {new Date(dashboardData.updatedAt).toLocaleTimeString()} </span> </h4> </div>
        
        <ul className="box-info">
            <li className='shadow grandtotal'>
                <i className="bx bi bi-currency-rupee"></i>
            <span className="text">
                <h3>{currency_formater.format(dashboardData.grand_total)}</h3>
                <p className='color-black'>Grand Total</p>
            </span>
            </li>
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
                 <h3>{currency_formater.format(dashboardData.limit_pm)}</h3>
                <p className='p-color'>Limit p<span className='seperator'>/</span>m to be saved</p>
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
        
        <hr style={{marginTop:'1em'}}/>
        <h2 className='header-color'>Incomes</h2>
        <ul className="box-info">
        <li>
            <i className="bx bi bi-calendar2-fill light-green-color  "></i>
            <span className="text">
                <h3> {currency_formater.format(dashboardData.salary_pm)}</h3>
                <p className='p-color'>Salary p<span className='seperator'>/</span>m</p>
            </span>
        </li>
        <li>
            <i className="bx bi bi-calendar2-fill light-green-color  "></i>
            <span className="text">
                <h3> {currency_formater.format(dashboardData.salary_pm)}</h3>
                <p className='p-color'>Other Sources of Income p<span className='seperator'>/</span>m</p>
            </span>
            </li>
        </ul>
        <hr style={{marginTop:'1em'}}/>

    </div>
    </>
}

export default DashboardList;