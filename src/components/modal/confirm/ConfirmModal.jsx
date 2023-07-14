import './confirm-modal.css'

const ConfirmModal = ({...props}) =>{
    return <>
        <div className={ props.open ? ['confirm-modal-container','show-modal',' container'].join(' ') : ['hide-modal'].join(' ')}>
            <div className='confirm-modal-item'>
                <i className="bi bi-x-lg modal-close" onClick={()=> props.setOpen((prevState)=> ({data:props.defaultRecord,open:false}))}></i>
                <div className='confirm-modal-title'>
                   <h3 className='header-color'> {props.title} </h3>
                </div>
                <div className='confirm-modal-content'>
                    <div className='confirm-content'>
                        {
                            props.content
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ConfirmModal