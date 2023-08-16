/* eslint-disable react/prop-types */
import { useCheckEmailIsAvailableMutation } from '../../../../services/pfm-api';
import './input.css';

const Input = ({validateAs = 'number',type="text",emailAvailability,register,getValues,clearErrors,name, required,state, disabled ,icon,handleOnChange, ...props}) =>{
    const [checkIsEmailAvailable,{isLoading}]= useCheckEmailIsAvailableMutation();
    return <>
    <div className='input-with-icon' >
       {icon ? icon :<i className="bi bi-currency-rupee"></i> }  
        <input  type={ type === 'password' ? 'password'  : 'text'} {...register(name,{
            required: required && 'This field is required',
            valueAsNumber: validateAs !== 'number' ? false : true,
            // pattern: {
            //     value:/^[0-9\b]+$/,
            //     message: 'Please enter valid numbers [0-9] only'
            // },
            // validate:(value)=> {
            //     if(validateAs === 'text'){
            //         return value.length > 0 || `Please add field ${name} value`;
            //     }else if(validateAs === 'email'){
            //         if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) === false){
            //             return 'Please enter valid email address.'
            //         }
            //     }else if(validateAs === 'password'){
            //         const {password, confirm_password} = getValues();
            //         if(confirm_password?.length >0 &&  password !== confirm_password){
            //             return 'Password do not match'
            //         }else{
            //             return true
            //         }
                    
            //     }else{ 
            //             if (value >=0)  return true; 
            //             return 'Please enter valid numbers [0-9] only'
            //         }
            //     },
            validate:{
              asPassword:() =>{
                if(validateAs === 'password'){
                    const {password, confirm_password} = getValues();
                    if(confirm_password?.length >0 &&  password !== confirm_password){
                        return 'Password do not match'
                    }else{
                        clearErrors('password')
                        clearErrors('confirm_password')
                        return true
                    }
                }
              },  
              availableEmail: async (value) =>{
                if(emailAvailability){
                    try{
                      const {data} = await checkIsEmailAvailable(value)
                       return data === undefined ||  "Email is not available"
                    }catch(catchError){
                    }
                    
                }
              },
              asEmail:(value)=>{
                if ( validateAs=== "email" &&  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) === false){
                        return 'Please enter valid email address.'
                }
              },
              asText:(value) => {
                if (validateAs === "text"){
                    console.log(' asText')
                    return value.length > 0 || `Please add field ${name} value`;
                } 
              },
              asNumber:(value) => {
                 if(validateAs === 'number'){
                    if(/^\d+$/.test(value) === false){    
                        return 'Please enter valid numbers [0-9] only.'
                    }
                 }
              }  
            },
            disabled:disabled,
            onChange: (value) => {  handleOnChange && handleOnChange(value,name)}
        })} {...props}     
        />
    </div>
    </>
}

export default Input;