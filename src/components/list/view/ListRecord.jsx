/* eslint-disable react/prop-types */
import '../list.css';
import AddRecords from '../add/AddRecords';
// import Modal from '../../modal/Modal';
import UpdateList from '../update/UpdateList';
import ConfirmModal from '../../modal/confirm/ConfirmModal';
import DeleteList from '../delete/DeleteList';
import useConfirm from '../../modal/confirm/ConfirmProvider';
import Info from '../../UI/info/Info';
import Modal from '../../modal/modal';

const ListRecord = ({data}) => {
    const confirm = useConfirm();

    const onDelete = async (currentRecord) => {
        let isConfirm = await confirm({title:'Delete', content:DeleteList, component: ConfirmModal, dashboardData:currentRecord })
        console.log('delete confirm ', isConfirm)
    }

    const onEdit = async (currentRecord) =>{
        let isConfirm = await confirm({title:'Edit Record', content:UpdateList, component: Modal, dashboardData: currentRecord})
    }

    const onAdd = async () => {
        let isConfirm = await confirm({title:'Add New Record', content: AddRecords, component:Modal})
    }

    if(data && data.length === 0){
        return <div> 
                    <Info title={'No List Records data found.'} desctiption={'Add List Record First'}>
                        <button className='btn btn-primary' onClick={onAdd}>Add New Record</button>
                    </Info>
                {/* <h1 className='ml-3'> </h1>
                <button className="btn btn-primary" onClick={onAdd}>
                    <span className="button-icon"><i className='bi bi-plus' style={{fontSize:'1rem'}}> </i> Add Records</span>
                </button> */}
        </div>
    }
    
    return (data && data.length !== 0) && <>
        
        <div className='main-list'>
            <div className="head-title">
                <div className="left">
                    <h1 className='header-color'>List</h1>
                </div>
                <button className="btn btn-primary" onClick={onAdd}>
                    <span className="button-icon"><i className='bi bi-plus' style={{fontSize:'1rem'}}> </i> Add Records</span>
                </button>
            </div>
            
            <ul className="list">
                {
                   data.map( (currentRecord,index) => {
                    return (
                        <li key={index}>
                            
                            <div className='list-inner-container'>
                                <span className='list-item'>
                                    <h5 className='p-color'> Bank Name </h5>
                                    {currentRecord.bank.name}
                                </span>
                                <span className='list-item'>
                                    <h5 className='p-color'> Bank Account </h5>
                                    {currentRecord.bank.account_no}
                                </span>
                                <span className='list-item'>
                                    <h5 className='p-color'> IFSC </h5>
                                      {currentRecord.bank.ifsc_code} 
                                </span>
                                <span className='list-item'>
                                    <h5 className='p-color'> Pan No </h5>
                                    {currentRecord.bank.pan_no}
                                </span>
                                <span className='list-item'>
                                    <h5 className='p-color'> Action </h5>
                                    <div className='list-action'>
                                        <i className="bi bi-pencil" onClick={()=>onEdit(currentRecord)}></i>
                                        <i className="bi bi-trash-fill color-danger" onClick={ () => onDelete(currentRecord)}></i>
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