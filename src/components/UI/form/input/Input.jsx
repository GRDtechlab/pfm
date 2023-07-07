/* eslint-disable react/prop-types */

import './input.css';

const Input = ({name, state, handleOnChange}) =>{
    return <>
    <div className='input-with-icon'>
        <i className="bi bi-currency-rupee"></i>
        <input type="text" required="required" 
            name={name}
            defaultValue={state}
            onChange={handleOnChange}/>
    </div>
    </>
}

export default Input;