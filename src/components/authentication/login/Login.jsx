import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import './login.css';
import logo from '../../../assets/logo.jpg';
import bgLogo from '../../../assets/bg.svg';
import loginImage from '../../../assets/login-color.svg';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../UI/form/input/Input';
import { useLoginMutation } from '../../../services/pfm-api';
import alertToast from '../../UI/toast/toastify-alert';
import { useDispatch } from 'react-redux';
import { setCredintials } from '../../../services/auth-slice';

const Login = () => {
    const [disableStatus, setDisableStatus] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [callLogin,{ isSuccess,isLoading }] = useLoginMutation()
    const {register, reset, handleSubmit, getValues,clearErrors ,formState:{errors}} = useForm({mode: "onChange"});
    
    const login = async (value) =>{
        try{
            
            const {auth, message} = await callLogin(value).unwrap();
            console.log('Only Auth', auth);
            dispatch(setCredintials(auth))
            alertToast({type:'success', message:message})
            navigate('/')

        }catch(error){
            console.log(error)
            alertToast({type:'error', message:error.data.error})
        }
    }

    const customHandleSubmit = (formsValue) =>{
        login(formsValue)
    }

    return <>
                
    <section>
                
            <div >
            <div className='img'>
                    {/* <img src={logo} className='logo'/> */}
                    
            </div>
                
                <form onSubmit={handleSubmit(customHandleSubmit)} className='shadow signup-form'>
                <h1 className='header-color'>
                   <span> Login </span>
                   
                </h1>
                <p className='p-color'>Sign in to your account!</p> 
                    <div className='group'>
                        <label className='p-color'>Email </label>
                        <Input validateAs='email' icon={<i className="bi bi-envelope-fill"></i>} name={'email'} className={errors?.email ? 'error':''} required register={register}  />
                        <span className='light-orage-color'> {errors?.email?.message}</span>
                    </div>
                    <div className='group'>
                        <label className='p-color'>Password </label>
                        <Input validateAs='password' type='password' getValues={getValues} clearErrors={clearErrors} icon={<i className="bi bi-file-lock-fill"></i>} name={'password'} className={errors?.password ? 'error':''} required register={register}  />
                        <span className='light-orage-color'> {errors?.password?.message}</span>
                    </div>
                    
                    <div className='w-100 mt-2'>
                        <button className='btn btn-large' type='submit' disabled={isLoading}> {isLoading? "Signing In..." : "Login"} </button>
                    </div>
                    <div className='signup'>
                        <h4 className='p-color mr-1'>Do you forgot your password?</h4>
                        <NavLink to='/public/forgotpassword'>
                            Reset Password
                        </NavLink>
                    </div>
                    <div className='create-account mt-2'>
                        <NavLink to='/public/signup'>
                            Create New Account
                        </NavLink>
                    </div>
                 </form>
                </div>
                <img className='img-login hide' src={loginImage} />
            </section>   
    </>
}

export default Login