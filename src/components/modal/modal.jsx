/* eslint-disable react/prop-types */

import './modal.css';

const Modal = ({...props }) => {
    return <>
    
        <div className={ props.open ? ['modal-container','show-modal',' container'].join(' ') : ['hide-modal'].join(' ')}>
            <div className='modal-item'> 
                <i className="bi bi-x-lg modal-close" onClick={()=> props.setOpen(false)}></i>
                <div className='modal-title'>
                   <h3 className='header-color'> {props.title} </h3>
                </div>
                <div className='modal-content'>
                    <div className='content'>
                        {
                            props.content
                        }
                    </div>
                </div>
                
            </div>
        </div>
    </>
}

export default Modal;