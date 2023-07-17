/* eslint-disable react/prop-types */
import currency_formater from '../../../Utils/currency-formatter';
import Input from '../../UI/form/input/Input';
import './update-dashboard.css';

import { useEffect, useState } from 'react'

const UpdateDashboard = ({dashboardData, onSubmit, closeModal}) => {
    const defaultRecord = {availableBalance:0,total_savings:0,limit_pm:0,salary_pm:0};
    const [state,setState] = useState(defaultRecord)
    
    const updateDashboardFormSubmit = (e) => {
        setState(prevState => {
            let currentInputUpdate =   { ...prevState, [e.target.name]: Number (e.target.value)}
            let finalUpdate = {...currentInputUpdate, availableBalance: currentInputUpdate.salary_pm - currentInputUpdate.limit_pm  }
            return finalUpdate;
        });
        
    }

    const handleSubmit = () =>{
        onSubmit(state);
        closeModal({open:false, data:defaultRecord});
    }

    const cancelModel = () =>{
        // console.log({state},{dashboardData})
        // setState(dashboardData)
        closeModal({open:false, data:defaultRecord})
    }

    useEffect(()=> {
        if(dashboardData) setState(() => dashboardData)
    },[dashboardData])

    return <>
        <form className='update-form-container'>
        <div className="group-label shadow">
                <h3> 
                     {currency_formater.format(state.availableBalance)}
                </h3>
                <p className='p-color'>Current Balance:</p>
            </div>
            <div className="group">
                <label className='p-color'>Total Savings: <p className='header-color'>Update or leave as it is.</p> </label>
                <Input name={'total_savings'} state={state.total_savings} handleOnChange={updateDashboardFormSubmit} />
            </div>
            <div className="group">
                <label className='p-color'>Update Limit p/m to be saved:</label>
                <Input name={'limit_pm'} state={state.limit_pm} handleOnChange={updateDashboardFormSubmit} />
            </div>
            <div className="group">
                <label className='p-color'>Update Salary p/m:</label>
                <Input name={'salary_pm'} state={state.salary_pm} handleOnChange={updateDashboardFormSubmit} />
            </div>
        </form>
        <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1 shadow' onClick={cancelModel}>Cancel</button>
                    <button className='btn btn-primary shadow' onClick={handleSubmit }>Update</button>
                </div>
        </div>
    </>
}

export default UpdateDashboard