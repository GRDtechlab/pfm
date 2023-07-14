import { useEffect, useState } from 'react';
import Input from '../../UI/form/input/Input';
import './add-records.css';
import { useAddRecordsMutation } from '../../../services/pfm-api';

const AddRecords = ({record, closeModal}) => {
    let defaultRecord = {bank: {name:'',account_no:'', ifsc_code:'' ,pan_no:''}};
    const [state,setState] = useState(defaultRecord)

    const [recordAdd] = useAddRecordsMutation();
    
    
    const updateAddRecordForm = (e) => {
        setState(prevState => ({bank: {...prevState.bank,[e.target.name]:e.target.value}}));
    }

    const handleSubmit = async () =>{
        const finalAddDashboardRecord = { user_id:'64a92ec2c0b4c1328f8089b7',  ...state }
        // onSubmit(state);
        // setState(defaultDashboardRecord); // when we want to clear input fields then use this.
        await recordAdd(finalAddDashboardRecord)
        setState(defaultRecord)
        closeModal(false);
    }

    useEffect(()=> {
        if(record) setState(() => record)
    },[record])

    return <>
        <form className='update-form-container'>
        <div className="group">
                <label className='p-color'>Bank Name: </label>
                <Input icon={<i className="bi bi-bank2"></i>} name={'name'}  state={state.bank.name}  handleOnChange={updateAddRecordForm} />
            </div>
            <div className="group">
                <label className='p-color'>Bank Account No: </label>
                <Input icon={<i className="bi bi-bank2"></i>} name={'account_no'} state={state.bank.account_no} handleOnChange={updateAddRecordForm} />
            </div>
            
            <div className="group">
                <label className='p-color'>IFSC Code: </label>
                <Input icon={<i className="bi bi-bank2"></i>} name={'ifsc_code'} state={state.bank.ifsc_code} handleOnChange={updateAddRecordForm} />
            </div>
            
            <div className="group">
                <label className='p-color'>PAN No: </label>
                <Input icon={<i className="bi bi-bank2"></i>} name={'pan_no'} state={state.bank.pan_no} handleOnChange={updateAddRecordForm} />
            </div>
        </form>
        <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1' onClick={() => closeModal({open:false, data:defaultRecord})}>Cancel</button>
                    <button className='btn btn-primary' onClick={handleSubmit }>Add</button>
                </div>
        </div>
    </>
}

export default AddRecords;