import { useDashboardDataQuery } from '../../services/pfm-api';

import DataLoaderHoc from '../dataloaderhoc/DataLoaderHoc';
import DashboardList from './list/DashboardList';

const Dashboard =() => {
    const Hoc = DataLoaderHoc(DashboardList);    
    const {data,error,isLoading} = useDashboardDataQuery({user_id:'64a92ec2c0b4c1328f8089b7'});
    // This is main container component where we use HOC for showing loading, error and,
    // on success we load dashboardlist component.
     return <Hoc isLoading={isLoading} error={error} data={data} />   
}

export default Dashboard;