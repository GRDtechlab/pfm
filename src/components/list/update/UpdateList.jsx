import { useEffect, useState } from 'react';
import Input from '../../UI/form/input/Input';
import './update-list.css';
import { useEditRecordsMutation } from '../../../services/pfm-api';

const UpdateList = ({closeModal,record}) =>{
    let defaultRecord = {bank: {name:'',account_no:'', ifsc_code:'' ,pan_no:''}};
    const [state,setState] = useState(defaultRecord)

    const [editRecord] = useEditRecordsMutation()

    const updateAddRecordForm =(e) =>{
        setState(prevState => ({...prevState, bank: {...prevState.bank,[e.target.name]:e.target.value}}));
    }

    const handleSubmit = async () =>{
        await editRecord(state)
        // console.log({state})
        closeModal({open:false, data:defaultRecord})   
    }

    useEffect(()=> {
        setState(() => record)
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
                    <button className='btn btn-primary' onClick={handleSubmit }>Update</button>
                </div>
        </div>
    </>
}

export default UpdateList