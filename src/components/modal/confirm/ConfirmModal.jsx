import './confirm-modal.css'

const ConfirmModal = ({...props}) =>{
    let Confirm = props?.content;
    return <>
        <div className={ props.open ? ['confirm-modal-container','show-modal',' container'].join(' ') : ['hide-modal'].join(' ')}>
            <div className='confirm-modal-item'>
                <i className="bi bi-x-lg modal-close" onClick={()=> props.onCancel()}></i>
                <div className='confirm-modal-title'>
                   <h3 className='header-color'> {props.title} </h3>
                </div>
                <div className='confirm-modal-content'>
                    <div className='confirm-content'>
    
                        {  Confirm && <Confirm closeModal={props.onCancel} onConfirm={props.onConfirm} data={props.dashboardData} /> }
                        
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ConfirmModal