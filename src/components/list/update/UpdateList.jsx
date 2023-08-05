import './update-list.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEditRecordsMutation } from '../../../services/pfm-api';
import Input from '../../UI/form/input/Input';

const UpdateList = ({closeModal,record}) =>{
    let defaultRecord = {bank: {name:'',account_no:'', ifsc_code:'' ,pan_no:''}};
    const {register, reset, handleSubmit, formState:{errors}} = useForm();
    const [editRecord] = useEditRecordsMutation()
    const updateAddRecordForm =() =>{}

    const customHandleSubmit = async (formsValue) =>{
        await editRecord(formsValue)
        closeModal({open:false, data:defaultRecord})   
    }

    useEffect(()=> {
        reset(record)
    },[record])

    return (<>
    
    <form className='update-form-container' onSubmit={handleSubmit(customHandleSubmit)}>
        <div className="group">
                <label className='p-color'>Bank Name: </label>
                <Input validateAs='text' icon={<i className="bi bi-bank2"></i>} name={'bank.name'}  register={register}  handleOnChange={updateAddRecordForm} />
                {errors?.bank?.name?.type === 'required' && <span className='light-orage-color'> {errors?.bank?.name?.message}</span> }
                {errors?.bank?.name?.type === 'validate' && <span className='light-orage-color'> {errors?.bank?.name?.message}</span> }
            </div>
            <div className="group">
                <label className='p-color'>Bank Account No: </label>
                <Input icon={<i className="bi bi-bank2"></i>} name={'bank.account_no'} register={register} handleOnChange={updateAddRecordForm} />
                {errors?.bank?.account_no?.type === 'required' && <span className='light-orage-color'> {errors?.bank?.account_no?.message}</span> }
                {errors?.bank?.account_no?.type === 'validate' && <span className='light-orage-color'> {errors?.bank?.account_no?.message}</span> }
            </div>
            
            <div className="group">
                <label className='p-color'>IFSC Code: </label>
                <Input validateAs='text' icon={<i className="bi bi-bank2"></i>} name={'bank.ifsc_code'} register={register} handleOnChange={updateAddRecordForm} />
                {errors?.bank?.ifsc_code?.type === 'required' && <span className='light-orage-color'> {errors?.bank?.ifsc_code?.message}</span> }
                {errors?.bank?.ifsc_code?.type === 'validate' && <span className='light-orage-color'> {errors?.bank?.ifsc_code?.message}</span> }
            </div>
            
            <div className="group">
                <label className='p-color'>PAN No: </label>
                <Input validateAs='text' icon={<i className="bi bi-bank2"></i>} name={'bank.pan_no'} register={register} handleOnChange={updateAddRecordForm} />
                {errors?.bank?.pan_no?.type === 'required' && <span className='light-orage-color'> {errors?.bank?.pan_no?.message}</span> }
                {errors?.bank?.pan_no?.type === 'validate' && <span className='light-orage-color'> {errors?.bank?.pan_no?.message}</span> }
            </div>
            <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1' onClick={() => closeModal({open:false, data:defaultRecord})}>Cancel</button>
                    <button className='btn btn-primary' type="submit">Update</button>
                </div>
        </div>
        </form>

    </>)
}

export default UpdateList