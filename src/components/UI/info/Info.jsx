/* eslint-disable react/prop-types */
import './info.css';
const Info = ({title,desctiption,children}) => {
    return <div className='ml-3 info shadow'>
    <div className="content">
        <i className="bi bi-info-circle"></i>
        <div>
            <h2 className='header-color'>{title}</h2>
            <span className='p-color'>{desctiption}</span>
        </div>
    </div>
        <div className='modal-bottom-action-info'>
            <div className='modal-action-group'>
                    { children }
            </div>
        </div>
 </div>
}

export default Info;