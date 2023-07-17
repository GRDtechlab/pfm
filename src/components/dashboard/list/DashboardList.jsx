import '../../dashboard/dashboard.css';

import { useState } from "react";

import Modal from "../../modal/modal";
import { useDashboardDataQuery, useNewDashboardDataMutation, useUpdateDashboardDataMutation } from "../../../services/pfm-api";
import AddDashboard from "../add/AddDashboard";
import UpdateDashboard from '../update/UpdateDashboard';

import currency_formater from "../../../Utils/currency-formatter";

const DashboardList = ({data}) =>{
    const defaultRecord = {availableBalance:0,total_savings:0,limit_pm:0,salary_pm:0};
    const [showModal,setShowModal] = useState({open:false,data:defaultRecord});
    
    const [dashboardUpdate] = useUpdateDashboardDataMutation();
    const [dashboardAdd] = useNewDashboardDataMutation();
    
    const {dashboardData} = useDashboardDataQuery({user_id:'64a92ec2c0b4c1328f8089b7'}, {
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

    const month = ['January','February','March','April','June','July','August', 'September','October','November','December'];
    const currentMonth = month[new Date().getMonth() - 1];
    const currentYear = new Date().getFullYear();

    
    const onSubmit = async (dashboardUpdateData) =>{
        console.log('handle submit called ', dashboardUpdateData)
        await dashboardUpdate(dashboardUpdateData)
}

    const addNewDashboardData = async (addDashboardRecord) =>{
        const finalAddDashboardRecord = { availableBalance:addDashboardRecord.salary_pm - addDashboardRecord.limit_pm, user_id:'64a92ec2c0b4c1328f8089b7',  ...addDashboardRecord }
        console.log({finalAddDashboardRecord})
        await dashboardAdd(finalAddDashboardRecord)
    }

    if(data && data.length === 0){
        return <div>
                      <h1 className='ml-3'>No Dashboard data found.</h1>
                      <button className='btn btn-primary' onClick={()=>{setShowModal({open:true})}}>Add New Record</button>
                      
                      <Modal  open={showModal.open} defaultRecord={defaultRecord} setOpen={setShowModal} title='Add New Record' content = {<AddDashboard record={showModal.data} onSubmit= {addNewDashboardData} closeModal={setShowModal} />}  />     
                     </div>
    }

    return (data && data.length !== 0) && <>
    <div className='main-dashboard'>
        <div className="head-title">
            <div className="left">
                <h1 className='header-color'>Dashboard </h1>
            </div>
                <a href="#" className="btn btn-primary shadow">
                <i className="bx bxs-cloud-download"></i>
                <span className="text">Download_PDF</span>
            </a>
        </div>
        <div className='action-header'>
        <h3 className='header-color'> {currentMonth} {currentYear} </h3>
        
            <i className='bi bi-pencil add' onClick={()=>{setShowModal({open:true, data:data[0]})}}></i>
            <Modal  open={showModal.open} defaultRecord={defaultRecord} setOpen={setShowModal} title='Update' content = {<UpdateDashboard dashboardData={showModal.data} onSubmit={onSubmit} closeModal={setShowModal} />} />            
        </div>
        <p className='p-color'>Last Updated At:  </p>
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

export default DashboardList;