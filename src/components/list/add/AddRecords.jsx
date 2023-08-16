import './add-records.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAddRecordsMutation } from '../../../services/pfm-api';
import Input from '../../UI/form/input/Input';
import { useGetCurrentUser } from '../../../services/get-current-logged-in-user-hook';


const AddRecords = ({record, closeModal}) => {
    let defaultRecord = {bank: {name:'',account_no:'', ifsc_code:'' ,pan_no:''}};
    const {register, reset, handleSubmit,formState:{errors}} = useForm();
    const [recordAdd] = useAddRecordsMutation();
    const user = useGetCurrentUser();
    const updateAddRecordForm = () => {}

    const customHandleSubmit = async (formsValue) =>{
        const finalAddDashboardRecord = { user_id:user._id,  ...formsValue }
        await recordAdd(finalAddDashboardRecord)
        closeModal(false);
    }

    useEffect(()=> {
        if(record) reset(record)
    },[record])

    return <>
        <form className='update-form-container' onSubmit={handleSubmit(customHandleSubmit)}>
        <div className="group">
            
                <label className='p-color'>Bank Name: </label>
                <Input validateAs='text' icon={<i className="bi bi-bank2"></i>} name={'bank.name'}  register={register}  handleOnChange={updateAddRecordForm} required />
                <span className='light-orage-color'> {errors?.bank?.name?.message}</span>
            </div>
            <div className="group">
                {console.log(errors)}
                <label className='p-color'>Bank Account No: </label>
                <Input icon={<i className="bi bi-bank2"></i>} name={'bank.account_no'} register={register} handleOnChange={updateAddRecordForm} required />
                <span className='light-orage-color'> {errors?.bank?.account_no?.message}</span>
            </div>
            
            <div className="group">
                <label className='p-color'>IFSC Code: </label>
                <Input validateAs='text' icon={<i className="bi bi-bank2"></i>} name={'bank.ifsc_code'} register={register} handleOnChange={updateAddRecordForm}  required />
                <span className='light-orage-color'> {errors?.bank?.ifsc_code?.message}</span>
            </div>
            
            <div className="group">
                <label className='p-color'>PAN No: </label>
                <Input validateAs='text' icon={<i className="bi bi-bank2"></i>} name={'bank.pan_no'} register={register} handleOnChange={updateAddRecordForm} required />
                <span className='light-orage-color'> {errors?.bank?.pan_no?.message}</span>
            </div>
            <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1' onClick={() => closeModal({open:false, data:defaultRecord})}>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Add</button>
                </div>
        </div>
        </form>
        
    </>
}

export default AddRecords;