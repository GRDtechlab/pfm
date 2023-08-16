import { useGetRecordsQuery } from '../../services/pfm-api';
import ListRecord from './view/ListRecord';
import DataLoaderHoc from '../dataloaderhoc/DataLoaderHoc';
import { useOutletContext } from 'react-router-dom';

const ListCmp =() => {
    const Hoc = DataLoaderHoc(ListRecord); 
    const { user } = useOutletContext();  
    const {data,error,isLoading} = useGetRecordsQuery({user_id:user._id});
   
    return <Hoc isLoading={isLoading} error={error} data={data} user={user} />
   
}

export default ListCmp; 