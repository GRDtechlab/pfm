import './add-dashboard.css';
import { useEffect, useState } from 'react';

import Input from '../../UI/form/input/Input';

const AddDashboard = ({record,onSubmit, closeModal}) => {
    let defaultDashboardRecord = {limit_pm: 0,salary_pm:0,total_savings:0};
    const [state,setState] = useState(defaultDashboardRecord)
    const updateDashboardFormSubmit = (e) => {
        setState(prevState => ({ ...prevState, [e.target.name]: Number (e.target.value)}));
    }

    const handleSubmit = () =>{
        onSubmit(state);
        setState(defaultDashboardRecord); // when we want to clear input fields then use this.
        closeModal({open:false, data:defaultDashboardRecord});
    }

    const onCancel = () =>{
        setState(() => defaultDashboardRecord);
        closeModal({open:false, data:defaultDashboardRecord})
    }

    useEffect(() => {
        console.log('use-effetct' ,defaultDashboardRecord)
        setState(() => defaultDashboardRecord)
    },[record])

    return <>
        <form className='update-form-container'>
            <div className="group">
                <label className='p-color'>Savings: <p className='header-color'>Start adding existing savings or 0</p> </label>
                <Input name={'total_savings'} state={ state.total_savings} handleOnChange={updateDashboardFormSubmit} />
            </div>
            <div className="group">
                <label className='p-color'>Limit p/m to be saved:  </label>
                <Input name={'limit_pm'} state={ state.limit_pm} handleOnChange={updateDashboardFormSubmit} />
            </div>
            <div className="group">
                <label className='p-color'>Salary p/m:</label>
                <Input name={'salary_pm'} state={state?.salary_pm} handleOnChange={updateDashboardFormSubmit} />
            </div>
        </form>
        <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1' onClick={onCancel}>Cancel</button>
                    <button className='btn btn-primary' onClick={handleSubmit }>Add</button>
                </div>
        </div>
    </>
}

export default AddDashboard;