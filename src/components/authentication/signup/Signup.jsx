import { useOutletContext } from 'react-router-dom';
import './signup.css';
import logo from '../../../assets/logo.jpg';
import signup from '../../../assets/signup.svg';
import { useEffect, useState } from 'react';
import Input from '../../UI/form/input/Input';
import { useForm } from 'react-hook-form';
import { useAddNewUserRecordMutation } from '../../../services/pfm-api';
import alertToast from '../../UI/toast/toastify-alert';

const Signup = () => {
    const [disableStatus, setDisableStatus] = useState(false);
    const [addUser,{isLoading}] = useAddNewUserRecordMutation();
     const {register, reset, handleSubmit, getValues,clearErrors ,formState:{errors}} = useForm({mode: "onChange"});

    const onAddNewUser = async (value) => {
        setDisableStatus(prevState => true); 
        try{
            const data = await addUser(value).unwrap();
            reset();
            alertToast({type:'success',message:'User added successfully.'});           
        }catch(catchError){
            if(catchError.status === 400){
                alertToast({type:'error',message:catchError.data.error});
            }
        }
        setDisableStatus(prevState => false); 
    }
    const customHandleSubmit = (signupFormValues) =>{
        onAddNewUser(signupFormValues)
    } 

    return<>
        <section>
            <div>
                <form onSubmit={handleSubmit(customHandleSubmit)} className='shadow signup-form'>
                <h1 className='header-color'>Sign Up</h1>
                <p className='p-color'>Tell us a bit about you!</p>
                    <div className='group'>
                            <label className='p-color'>First Name </label>
                            <Input validateAs='text' className={errors?.firstname ? 'error':''} icon={<i className="bi bi-person-fill"></i>} name={'firstname'} required register={register}  />
                            <span className='light-orage-color'> {errors?.firstname?.message}</span>
                    </div>
                    <div className='group'>
                            <label className='p-color'>Last Name </label>
                            <Input validateAs='text' className={errors?.lastname ? 'error':''} icon={<i className="bi bi-person-fill"></i>} name={'lastname'} required register={register}  />
                            <span className='light-orage-color'> {errors?.lastname?.message}</span>
                    </div>
                    <div className='group'>
                            <label className='p-color'>Occupation </label>
                            <Input validateAs='text' className={errors?.occupation ? 'error':''} icon={<i className="bi bi-person-fill"></i>} name={'occupation'} required register={register}  />
                            <span className='light-orage-color'> {errors?.occupation?.message}</span>
                    </div>
                    <div className='group'>
                        <label className='p-color'>Email </label>
                        <Input validateAs='email' emailAvailability icon={<i className="bi bi-envelope-fill"></i>} name={'email'} className={errors?.email ? 'error':''} required register={register}  />
                        <span className='light-orage-color'> {errors?.email?.message}</span>
                    </div>
                    <div className='group'>
                        <label className='p-color'>Password </label>
                        <Input validateAs='password' type='password' getValues={getValues} clearErrors={clearErrors} icon={<i className="bi bi-file-lock-fill"></i>} name={'password'} className={errors?.password ? 'error':''} required register={register}  />
                        <span className='light-orage-color'> {errors?.password?.message}</span>
                    </div>
                    <div className='group'>
                        <label className='p-color'>Confirm Password </label>
                        <Input validateAs='password' type='password' getValues={getValues} clearErrors={clearErrors} icon={<i className="bi bi-file-lock-fill"></i>} name={'confirm_password'} className={errors?.confirm_password ? 'error':''} required register={register}   />
                        <span className='light-orage-color'> {errors?.confirm_password?.message}</span>
                        {errors?.type === 'asPassword' && <span className='light-orage-color'> {errors?.password?.message}</span>}    
                    </div>
                    <div className='w-100 mt-2'>
                        <button className='btn btn-large' type='submit' disabled={isLoading}> {isLoading? "Signing Up..." : "Register"}</button>
                    </div>
                </form>
            </div>
            <img className='img-login hide' src={signup} />
        </section>
    </>
}   

export default Signup