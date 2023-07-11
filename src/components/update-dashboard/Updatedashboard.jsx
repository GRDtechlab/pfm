/* eslint-disable react/prop-types */
import { useState } from 'react'
import currency_formater from '../../Utils/currency-formatter'
import './update-dashboard.css'
import Input from '../UI/form/input/Input'

const Updatedashboard = ({dashboardData, onSubmit, closeModal}) => {
    const [state,setState] = useState(dashboardData)
    
    const updateDashboardFormSubmit = (e) => {
        setState(prevState => ({ ...prevState, [e.target.name]: Number (e.target.value)}));
    }

    const handleSubmit = () =>{
        onSubmit(state);
        closeModal(false);
    }

    // useEffect(() => {
    //     console.log({dashboardData})
    //     setState(() => dashboardData)
    // },[])

    return <>
        <form className='update-form-container'>
        {/* <div className="group-label">
                <label className='p-color'>Total Savings:</label>
                <h3> 
                     {currency_formater.format(dashboardData.total_savings)}
                </h3>
            </div> */}
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
                    <button className='btn btn-light mr-1' onClick={() => closeModal(false)}>Cancel</button>
                    <button className='btn btn-primary' onClick={handleSubmit }>Update</button>
                </div>
        </div>
    </>
}

export default Updatedashboard