import {useNavigate} from 'react-router-dom';
import './dataloaderhoc.css';
import Info from '../UI/info/Info';

// eslint-disable-next-line react/display-name
const DataLoaderHoc = WrapedComponent => props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    let {isLoading, error, localError} = props;
    

    if(localError){
        if(localError.dashboardData === 0){     
            return <div className='ml-3'>
                        <Info title={'Dashboard Data is not available'} desctiption={'First, add dashboard data then you will able to add transactions'}>
                            <button className='btn btn-primary' onClick={() => navigate('/')} >Dashboard</button>
                        </Info>      
                     </div> 
        }
    }

    if(error){
        return <div> {error.status === 'FETCH_ERROR' && <h1 className='ml-3'>Server is not Responding. Check after sometimes.</h1>}  </div>
    }
    if(isLoading){
        return <h1 className='ml-3'>Data is fetching... </h1>
    }
    
    return <WrapedComponent {...props} />
}
export default DataLoaderHoc;