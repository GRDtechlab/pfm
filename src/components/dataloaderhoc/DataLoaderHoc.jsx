import Modal from '../modal/modal';
import './dataloaderhoc.css';

// eslint-disable-next-line react/display-name
const DataLoaderHoc = WrapedComponent => props => {
    let {isLoading, error, data} = props;
    console.log(props, ' HOC');
    if(error){
        return <div> {error.status === 'FETCH_ERROR' && <h1 className='ml-3'>Server is not Responding. Check after sometimes.</h1>}  </div>
    }
    if(isLoading){
        return <h1 className='ml-3'>Data is fetching from HOC </h1>
    }

    return <WrapedComponent {...props} />
}
export default DataLoaderHoc;