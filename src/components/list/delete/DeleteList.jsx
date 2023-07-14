import { useDeleteRecordsMutation } from '../../../services/pfm-api';
import './delete-list.css';

const DeleteList = ({record,closeModal}) => {
let defaultRecord = {};
const [deleteCurrentRecord] = useDeleteRecordsMutation();
    

const handleDelete = async() => {
    await deleteCurrentRecord(record);
    closeModal({open:false, data:defaultRecord})
}
return <>
        <div>
                <h4 className='font-color'>Are you sure, Do you want to Delete?</h4>
                <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1' onClick={() => closeModal({open:false, data:defaultRecord})}>Cancel</button>
                    <button className='btn btn-danger' onClick={handleDelete }>Yes</button>
                </div>
                </div>
        </div>
</>
}

export default DeleteList