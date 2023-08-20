
import { useEffect, useState } from 'react';
import { useDashboardDataQuery, useGetTransactionQuery } from '../../services/pfm-api';
import DataLoaderHoc from '../dataloaderhoc/DataLoaderHoc';
import TransactionList from './list/TransactionList';
import { useOutletContext } from 'react-router-dom';

const Transaction = () => {
    const Hoc = DataLoaderHoc(TransactionList);
    const { user } = useOutletContext();
    const [localError, setLocalError] = useState(null);
    const {data,error,isLoading} = useGetTransactionQuery({user_id:user._id});
    const dashboardData = useDashboardDataQuery({user_id:user._id}).data
    console.log({dashboardData},user._id)
   return <Hoc isLoading={isLoading} error={error} data={data} localError={{dashboardData:dashboardData?.length}} setLocalError={setLocalError} user={user}  />
}

export default Transaction