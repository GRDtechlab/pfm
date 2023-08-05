import currency_formater from '../../../Utils/currency-formatter';
import './confirm.css';

const Confirm = ({closeModal, onConfirm, data}) =>{

    const handleConfirm = () =>{

        onConfirm()
    }
    return <>
                <p className='font-color'>
                    Transaction Amount is greater than current Balance. Now, we will deduct amount from your current month target amount. Do you want to continue?
                </p>
                {console.log({data})}
                <h3 className='header-color'>Summary</h3>
                <div className='group w-100 group-balance'> 
                    <ul className='balance-container m-1'>
                        <li className='shadow'>
                            <label className='p-color'>Grand Total</label>
                                <h3 className='color-primary'>{currency_formater.format(data.grand_total)}</h3>
                        </li>
                        <li className='shadow'>
                            <label className='p-color'>Total Saved</label>
                                <h3 className='color-primary'>{currency_formater.format(data.total_savings)}</h3>
                        </li>
                        <li className='shadow'>
                            <label className='p-color'>Limit to be saved</label>
                                <h3 className='color-primary'>{currency_formater.format(data.limit_pm)}</h3>
                        </li>
                        
                    </ul>
                </div>
                <h3 className='header-color'>Your Transaction</h3>
                <div className='group w-100 group-balance'> 
                    <ul className='balance-container m-1'>
                        <li className='shadow'>
                            <label className='p-color'>Current Balance</label>
                                <h3 className='color-primary'>{currency_formater.format(data.availableBalance)}</h3>
                        </li>
                        <li className='shadow'>
                            <label className='p-color'>Type</label>
                                <h3 className='color-primary'>Debit</h3>
                        </li>
                        <li className='shadow'>
                            <label className='p-color'>Amount</label>
                                <h3 className='color-primary'>{currency_formater.format(data.formsValue.transaction_amount)}</h3>
                        </li>
                        
                    </ul>
                </div>
                <h3 className='header-color'>Result</h3>
                
                     <div>
                          {data.result.currentBalance >=0 && <div> Current Balance: {data.result.currentBalance} </div> } 
                        {data.result.limit >=0 && <div> Limit: {data.result.limit} </div> } 
                        {data.result.totalSaved >=0 && <div> Total Saved: {data.result.totalSaved} </div> } 
                        {data.result.grand_total >=0 && <div> Grand Total: {data.result.grand_total} </div> } 
                    </div>
                    
                {
                    data.result.isDeclined === true && <p className='debit'>Transaction going to be declined</p>
                }
                <div className='modal-bottom-action-info'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1' onClick={() => closeModal()}>Cancel</button>
                    <button className='btn btn-danger' onClick={handleConfirm}>Confirm</button>
                </div>
                </div>
    </>
}

export default Confirm