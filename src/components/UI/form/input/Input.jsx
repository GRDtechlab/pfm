/* eslint-disable react/prop-types */

import './input.css';

const Input = ({name, state, icon,handleOnChange}) =>{
    return <>
    <div className='input-with-icon'>
       {icon ? icon :<i className="bi bi-currency-rupee"></i> }  
        <input type="text" required="required" 
            name={name}
            value={state}
            onChange={handleOnChange}/>
    </div>
    </>
}

export default Input;