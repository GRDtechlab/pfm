
import { useEffect, useState } from 'react';
import { useDashboardDataQuery, useGetTransactionQuery } from '../../services/pfm-api';
import DataLoaderHoc from '../dataloaderhoc/DataLoaderHoc';
import TransactionList from './list/TransactionList';

const Transaction = () => {
    const Hoc = DataLoaderHoc(TransactionList);
    const [localError, setLocalError] = useState(null);
    const {data,error,isLoading} = useGetTransactionQuery({user_id:'64a92ec2c0b4c1328f8089b7'});
    const {dashboardData} = useDashboardDataQuery({user_id:'64a92ec2c0b4c1328f8089b7'}, {
        // At present this is not required but for reference I added this selectFromResult...
        // Here selectFromResult is used to find out alredy availale data from api. In our case we called data from Main.jsx,
        // then we used this data and add condition to check if its array of not then we need only object of that data.
        selectFromResult:({data})=>{
            if(!Array.isArray(data)){
                data = [];
            }
                return {dashboardData:data.length}
        }
    })
    
   return <Hoc isLoading={isLoading} error={error} data={data} localError={{dashboardData}} setLocalError={setLocalError}  />
}

export default Transaction