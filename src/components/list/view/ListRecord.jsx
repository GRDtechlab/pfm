import { useState } from 'react';
import '../list.css';
import AddRecords from '../add/AddRecords';
import Modal from '../../modal/modal';
import UpdateList from '../update/UpdateList';
import ConfirmModal from '../../modal/confirm/ConfirmModal';
import DeleteList from '../delete/DeleteList';

const ListRecord = ({data}) => {
    const defaultRecord = {bank: {name:'',account_no:'', ifsc_code:'' ,pan_no:''}};
    const [showAddModal,setShowAddModal] = useState({open:false, data:defaultRecord});
    const [showUpdateModal,setShowUpdateModal] = useState({open:false,data:defaultRecord});
    const [showDeleteModal,setShowDeleteModal] = useState({open:false,data:{}});

     if(data && data.length === 0){
        return <div> 
                <h1 className='ml-3'>No List Records data found. </h1>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <span className="button-icon"><i className='bi bi-plus' style={{fontSize:'1rem'}}> </i> Add Records</span>
                </button>
                {console.log({data},' list-cmp')}
                <Modal  open={showAddModal.open} defaultRecord={defaultRecord} setOpen={setShowAddModal} title='Add New Record' content = {<AddRecords  record={showAddModal.data} closeModal={setShowAddModal} />}  />
        </div>
    }
    
    return (data && data.length !== 0) && <>
        
        <div className='main-list'>

        <Modal  open={showUpdateModal.open} defaultRecord={defaultRecord} setOpen={setShowUpdateModal} title='Update List'  content = {<UpdateList record={showUpdateModal.data} closeModal={setShowUpdateModal} />} />

        <ConfirmModal open={showDeleteModal.open} defaultRecord={{}} setOpen={setShowDeleteModal} title='Delete' content={<DeleteList record={showDeleteModal.data} closeModal={setShowDeleteModal} />} />

            <div className="head-title">
                <div className="left">
                    <h1 className='header-color'>List</h1>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal({open:true})}>
                    <span className="button-icon"><i className='bi bi-plus' style={{fontSize:'1rem'}}> </i> Add Records</span>
                </button>
                <Modal  open={showAddModal.open} defaultRecord={defaultRecord} setOpen={setShowAddModal}  title='Add New Record' content = {<AddRecords record={showAddModal.data}  closeModal={setShowAddModal} />}  />
            </div>
            
            <ul className="list">
                {
                   data.map( (currentRecord,index) => {
                    return (
                        <li key={index}>
                            
                            <div className='list-inner-container'>
                                <span className='text'>
                                    <h5 className='p-color'> Bank Name </h5>
                                    {currentRecord.bank.name}
                                </span>
                                <span className='text'>
                                    <h5 className='p-color'> Bank Account </h5>
                                    {currentRecord.bank.account_no}
                                </span>
                                <span className='text'>
                                    <h5 className='p-color'> IFSC </h5>
                                      {currentRecord.bank.ifsc_code} 
                                </span>
                                <span className='text'>
                                    <h5 className='p-color'> Pan No </h5>
                                    {currentRecord.bank.pan_no}
                                </span>
                                <span className='text'>
                                    <h5 className='p-color'> Action </h5>
                                    <div className='list-action'>
                                        
                                        <i className="bi bi-pencil" onClick={()=>setShowUpdateModal( (prevState)=> ({open:true,data:currentRecord}))}></i>
                                        <i className="bi bi-trash-fill color-danger" onClick={()=> setShowDeleteModal((prevState) => ({open:true,data:currentRecord}))}></i>
                                    </div>
                                </span>
                            </div>
                        </li>
                        
                    )
                } )  
            }
            </ul>
        </div>
    </>

}

export default ListRecord;