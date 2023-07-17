import { useState } from 'react';
import Modal from '../../modal/modal';
import '../../transaction/transaction.css';
import TransactionAdd from '../add/TransactionAdd';

const TransactionList = () =>{
    const [showAddModal,setShowAddModal] = useState({open:false, data:{}});
    return <>
        <div className='main-list'>
            <div className="head-title">
                <div className="left">
                    <h1 className='header-color'>Transaction</h1>
                </div>
                <button className="btn btn-primary" onClick={()=> setShowAddModal({open:true})} >
                    <span className="button-icon"><i className='bi bi-plus' style={{fontSize:'1rem'}}> </i> Add Transaction</span>
                </button>
            </div>
            <Modal  open={showAddModal.open} defaultRecord={{}} setOpen={setShowAddModal} title='Add New Record' content = {<TransactionAdd   closeModal={setShowAddModal} />}  />
        </div>

    </>
}

export default TransactionList;