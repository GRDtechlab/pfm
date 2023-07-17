
import DataLoaderHoc from '../dataloaderhoc/DataLoaderHoc';
import TransactionList from './list/TransactionList';

const Transaction = () => {
    const Hoc = DataLoaderHoc(TransactionList);   
    
   return <Hoc isLoading={false} error={null} />
}

export default Transaction