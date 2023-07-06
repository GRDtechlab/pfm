/* eslint-disable react/prop-types */

import './modal.css';

const Modal = (props) => {
    
    return <>
    
        <div className={ props.open ? ['modal-container','show-modal',' container'].join(' ') : ['hide-modal'].join(' ')}>
            <div className='modal-item'> 
                <i className="bi bi-x-lg modal-close" onClick={()=> props.setOpen(false)}></i>
                <div className='modal-title'>
                   <h3> {props.title} </h3>
                </div>
                <div className='modal-content'>
                    <div className='content'>
                        {
                            props.content
                        }
                    </div>
                    <div className='modal-bottom-action'>
                        <div className='modal-action-group'>
                            <button className='btn btn-light mr-1'>Cancel</button>
                            <button className='btn btn-primary'>Ok</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
}

export default Modal;