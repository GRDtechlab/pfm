import { useGetRecordsQuery } from '../../services/pfm-api';
import ListRecord from './view/ListRecord';
import DataLoaderHoc from '../dataloaderhoc/DataLoaderHoc';

const ListCmp =() => {
    const Hoc = DataLoaderHoc(ListRecord);   
    const {data,error,isLoading} = useGetRecordsQuery({user_id:'64a92ec2c0b4c1328f8089b7'});
   
    return <Hoc isLoading={isLoading} error={error} data={data}  />
   
}

export default ListCmp; 