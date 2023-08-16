import { useOutletContext } from 'react-router-dom';
import { useGetCurrentUser } from '../../services/get-current-logged-in-user-hook';
import { useDashboardDataQuery } from '../../services/pfm-api';

import DataLoaderHoc from '../dataloaderhoc/DataLoaderHoc';
import DashboardList from './list/DashboardList';

const Dashboard =() => {
    const currentUser =  useGetCurrentUser();
    const { user } = useOutletContext();
    const Hoc = DataLoaderHoc(DashboardList);    
    const {data,error,isLoading} = useDashboardDataQuery({user_id:user._id});
    // This is main container component where we use HOC for showing loading, error and,
    // on success we load dashboardlist component.
     return <Hoc isLoading={isLoading} error={error} data={data} user={user} />   
}

export default Dashboard;