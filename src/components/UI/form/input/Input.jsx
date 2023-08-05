/* eslint-disable react/prop-types */

import './input.css';

const Input = ({validateAs = 'number',register,name, required,state, disabled ,icon,handleOnChange, ...props}) =>{
    return <>
    <div className='input-with-icon' >
       {icon ? icon :<i className="bi bi-currency-rupee"></i> }  
        <input  type="text" {...register(name,{
            required: required && 'This field is required',
            valueAsNumber: validateAs === 'text' ? false : true,
            // pattern: {
            //     value:/^[0-9\b]+$/,
            //     message: 'Please enter valid numbers [0-9] only'
            // },
            validate:(value)=> {
                
                if(validateAs === 'text'){
                    return value.length > 0 || `Please add field ${name} value`;
                } 
                if (value >=0)  return true; 
                 return 'Please enter valid numbers [0-9] only'
            },
            disabled:disabled,
            onChange: (value) => {handleOnChange(value,name)}
        })} {...props}     
        />
    </div>
    </>
}

export default Input;