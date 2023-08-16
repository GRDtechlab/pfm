/* eslint-disable react/prop-types */

import './Modal.css';

const Modal = ({...props }) => {
    let Confirm = props?.content;
    return <>
        <div className={ props.open ? ['modal-container','show-modal',' container'].join(' ') : ['hide-modal'].join(' ')}>
            <div className='modal-item'>
                <i className="bi bi-x-lg modal-close" onClick={()=> props.onCancel()}></i>
                <div className='modal-title'>
                   <h3 className='header-color'> {props.title} </h3>
                </div>
                <div className='modal-content'>
                    <div className='content'>
                        { typeof Confirm === 'function' &&  <Confirm closeModal={props.onCancel} record={props.dashboardData}  />}
                    </div>
                </div>
                
            </div>
        </div>
    </>
}

export default Modal;