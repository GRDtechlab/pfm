/* eslint-disable react/prop-types */
import './add-dashboard.css';
import { useEffect } from 'react';
import {useForm} from 'react-hook-form';
import Input from '../../UI/form/input/Input';
import { useNewDashboardDataMutation } from '../../../services/pfm-api';

const AddDashboard = ({record, closeModal}) => {
    let defaultDashboardRecord = {limit_pm: null,salary_pm:null,total_savings:null};
    const {register, reset, handleSubmit, formState:{errors}} = useForm({mode: "onChange"});    
    const [dashboardAdd] = useNewDashboardDataMutation();

    const updateDashboardFormSubmit = () => {     
        // console.log({errors})   
        // setState(prevState => ({ ...prevState, [e.target.name]: Number (e.target.value)}));
    }

    const onAddDashboardRecord = async (addDashboardRecord) =>{
        const finalAddDashboardRecord = { availableBalance:+addDashboardRecord.salary_pm - +addDashboardRecord.limit_pm, user_id:'64a92ec2c0b4c1328f8089b7',  ...addDashboardRecord }
        await dashboardAdd(finalAddDashboardRecord)
    }
    
    const customHandleSubmit = (formsValue) =>{
        onAddDashboardRecord(formsValue);
        closeModal({open:false, data:defaultDashboardRecord});
    }

    const onCancel = () =>{
        closeModal({open:false, data:defaultDashboardRecord})
    }

    useEffect(() => {
        reset(defaultDashboardRecord);
    },[record])

    return <>
        <form className='update-form-container' onSubmit={handleSubmit(customHandleSubmit)}>
            <div className="group">
                
                <label className='p-color'>Savings: <p className='header-color'>Start adding existing savings or 0</p> </label>
                <Input name={'total_savings'}  className={errors?.total_savings ? 'error':''} register={register} required handleOnChange={updateDashboardFormSubmit} />
                {errors?.total_savings?.type === 'validate' && <span className='light-orage-color'> {errors?.total_savings?.message}</span> }
                {errors?.total_savings?.type === 'required' && <span className='light-orage-color'> {errors?.total_savings?.message}</span> }

            </div>
            <div className="group">
                <label className='p-color'>Limit p/m to be saved:  </label>
                <Input name={'limit_pm'} className={errors?.limit_pm ? 'error':''} register={register} required handleOnChange={updateDashboardFormSubmit} />
                {errors?.limit_pm?.type === 'validate' && <span className='light-orage-color'> {errors?.limit_pm?.message}</span> }
                {errors?.limit_pm?.type === 'required' && <span className='light-orage-color'> {errors?.limit_pm?.message}</span> }
            </div>
            <div className="group">
                <label className='p-color'>Salary p/m:</label>
                <Input name={'salary_pm'} className={errors?.salary_pm ? 'error':''} register={register} required handleOnChange={updateDashboardFormSubmit} />
                {errors?.salary_pm?.type === 'validate' && <span className='light-orage-color'> {errors?.salary_pm?.message}</span> }
                {errors?.salary_pm?.type === 'required' && <span className='light-orage-color'> {errors?.salary_pm?.message}</span> }
            </div>
            <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1' onClick={onCancel}>Cancel</button>
                    <button className='btn btn-primary' type='submit' >Add</button>
                </div>
        </div>
        </form>
    </>
}

export default AddDashboard;