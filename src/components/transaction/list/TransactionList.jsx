import { useEffect, useState } from 'react';
import Modal from '../../modal/modal';
import '../../transaction/transaction.css';
import TransactionAdd from '../add/TransactionAdd';
import Info from '../../UI/info/Info';
import currency_formater from '../../../Utils/currency-formatter';
import useConfirm from '../../modal/confirm/ConfirmProvider';

const TransactionList = ({data}) =>{
    const  defaultRecord = {transaction_type:'',transaction_amount:'', transaction_description:''}
    const [showSearch, setShowSearch] = useState(false);
    const confirm = useConfirm();

    const onAdd =() => {
        let isConfirm = confirm({title: 'Add New Transaction', component: Modal, content: TransactionAdd})
    }
    console.log({data})

    if(data && data.length === 0){
        return <div> 
                {/* <h1 className='ml-3'>No Transactions data found. </h1> */}
                <Info title={'Transactions'} desctiption={'No Transactions data found. Add Records.'} >
                <button className="btn btn-primary" onClick={onAdd}>
                    <span className="button-icon"><i className='bi bi-plus' style={{fontSize:'1rem'}}> </i> Add Records</span>
                </button>
                </Info>
        </div>
    }

    return <>
        <div className='main-transaction'>
            <div className="head-title">
                <div className="left">
                    <h1 className='header-color'>Transaction</h1>
                </div>
                <button className="btn btn-primary" onClick={onAdd} >
                    <span className="button-icon"><i className='bi bi-plus' style={{fontSize:'1rem'}}> </i> Add Entry</span>
                </button>
            </div>
            <div className='transaction-list-container '> 
                <div className="head">
                   { showSearch === false && <h3 className='header-color'>Transaction History</h3> }
                    <div className= {showSearch === true ? ['search','show-search'].join(' ') : ['seach','hide-search'].join(' ') }>
                        <input type='text' placeholder='Search...'/>
                    </div>
                    {
                        showSearch === false && <i className="bi bi-search add" onClick={() => setShowSearch(true)}></i>
                    }
                    {
                        showSearch === true && <i className="bi bi-x-circle add" onClick={()=> setShowSearch(false)}></i>
                    }
                    <i className="bi bi-filter add" style={{fontSize:'1.5rem'}}></i>
                </div>
                <table>
                    <thead className='shadow'>
                        <tr className='header-color'>
                            <th>Sr.No</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((rowTransactionRecord, index) => {
                            
                            if('dashboard' in rowTransactionRecord === true ){
                                return <tr  key={rowTransactionRecord._id}>
                                        <td>{data.length - index}</td>
                                        <td colSpan={2} >{rowTransactionRecord.dashboard.description}</td>
                                        
                                        <td></td>
                                        <td></td>
                                        <td>{currency_formater.format (rowTransactionRecord.dashboard.grand_total)}</td>
                                </tr>
                            }

                            if('dashboard' in rowTransactionRecord === false){

                                return <tr key={rowTransactionRecord._id} >
                                        <td>{data.length - index}</td>
                                        <td>{rowTransactionRecord.transaction_description}</td>
                                        <td> { currency_formater.format (rowTransactionRecord.transaction_amount)}</td>
                                        <td>{ new Date(rowTransactionRecord.createdAt).toLocaleDateString() }</td>
                                        <td>
                                            <p className='tag'> 
                                                <span className={ rowTransactionRecord.transaction_type === 'debit' ? 'debit' : 'credit' }>{ rowTransactionRecord.transaction_type }</span> 
                                            </p>
                                        </td>
                                        <td>{currency_formater.format (rowTransactionRecord.grand_total) }</td>        
                                </tr>
                            }
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>

    </>
}

export default TransactionList;