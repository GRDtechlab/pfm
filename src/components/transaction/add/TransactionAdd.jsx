/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import Input from '../../UI/form/input/Input';
import './transaction-add.css';
import { useAddTransactionMutation, useDashboardDataQuery } from '../../../services/pfm-api';
import { useForm } from 'react-hook-form';
import currency_formater from '../../../Utils/currency-formatter';
import ConfirmModal from '../../modal/confirm/ConfirmModal';
import Confirm from '../confirm/Confirm';
import useConfirm from '../../modal/confirm/ConfirmProvider';

const TransactionAdd = ({record, closeModal}) =>{
    // let defaultRecord = {transaction_type:'',transaction_amount:'', transaction_description:''  }
    const [addTransaction] = useAddTransactionMutation();
    const {register, reset, handleSubmit, formState:{errors}} = useForm({mode: "onChange"});
    const [disableStatus, setDisableStatus] = useState(false);
    const confrim = useConfirm();

    const {dashboardData} = useDashboardDataQuery({user_id:'64a92ec2c0b4c1328f8089b7'}, {
        // At present this is not required but for reference I added this selectFromResult...
        // Here selectFromResult is used to find out alredy availale data from api. In our case we called data from Main.jsx,
        // then we used this data and add condition to check if its array of not then we need only object of that data.
        selectFromResult:({data})=>{
            if(!Array.isArray(data)){
                data = [];
            }
            if( data.length !== 0) {
                return {dashboardData: data[0]}
            }else{
                return {dashboardData:data}
            }
        }
    })

    const updateAddTransactionForm = (e) =>{
        console.log(errors)
    }

    const notify = (messsage) => toast.error(messsage, {
        position: toast.POSITION.TOP_CENTER
      });

    const continueTransaction = async (record) => {
                
        setDisableStatus(prevState => true); 
        try{
            await addTransaction(record).unwrap();
        }catch(catchError){
            
            if(catchError.status === 400){
                notify(catchError.data.error);
            }
            
        }
         setDisableStatus(prevState => false);
         closeModal({open:false});
    }

    const customHandleSubmit = async (formsValue) =>{
        console.log({formsValue});
        
        const finalTransactionRecord = { user_id:'64a92ec2c0b4c1328f8089b7',  ...formsValue }          
        if(finalTransactionRecord.transaction_type === 'debit'){
            if( finalTransactionRecord.transaction_amount >= dashboardData.availableBalance ){
                    let result ={};
                    result['currentBalance'] = 0;
                    let currentAmountAfterCurrentBalanceDeduct = +finalTransactionRecord.transaction_amount - +dashboardData.availableBalance;
                    
                    if(currentAmountAfterCurrentBalanceDeduct >= +dashboardData.limit_pm){
                        result['limit'] = 0;
                        let balanceAfterLimit = currentAmountAfterCurrentBalanceDeduct - +dashboardData.limit_pm;
                    
                        if(balanceAfterLimit >= +dashboardData.total_savings){
                            result['totalSaved'] = 0;
                            let balanceAfterGrandTotal = balanceAfterLimit - +dashboardData.grand_total;
                            
                            if(balanceAfterGrandTotal >= +dashboardData.grand_total){
                                result['grand_total'] =0;
                            }else{
                                result['grand_total'] = +dashboardData.grand_total - +dashboardData.grand_total;
                            }
                        }else{
                            result['totalSaved'] = +dashboardData.total_savings - balanceAfterLimit;
                        }
                    }else{
                        result['limit']= +dashboardData.limit_pm - +currentAmountAfterCurrentBalanceDeduct;
                    }

                    let isDeclined = finalTransactionRecord.transaction_amount > +dashboardData.grand_total;
                    result['isDeclined'] = isDeclined
                   
                    let isConfirm = await confrim({title:'Alert', content:Confirm, dashboardData:{...dashboardData, formsValue, result}, component: ConfirmModal })
                    if(isConfirm){
                        continueTransaction(finalTransactionRecord)
                    }
            }else{
                continueTransaction(finalTransactionRecord)
            }
        }else{
            continueTransaction(finalTransactionRecord)
        }

    }

    const onCancel = ()=>{
        closeModal({open:false})
    }

    useEffect(()=> {
        if(record) reset(record)
    },[record])

    return <>
    
        <form className='update-form-container' onSubmit={handleSubmit(customHandleSubmit)}>
            <h3 className='header-color tag-color mb-1'>Balance Info</h3>   
            <div className='group w-100 group-balance'>
                
                <ul className='balance-container m-1'>
                <li className='shadow'>
                        <label className='p-color'>Grand Total</label>
                            <h3 className='color-primary'>{currency_formater.format(dashboardData.grand_total)}</h3>
                    </li>
                    <li className='shadow'>
                        <label className='p-color'>Current Balance</label>
                        <p>
                            <span>{currency_formater.format(dashboardData.availableBalance)}</span>
                        </p>
                    </li>
                    <li className='shadow'>
                        <label className='p-color'>Limit to be saved</label>
                        <p>
                            <span>{currency_formater.format(dashboardData.limit_pm)}</span>
                        </p>
                    </li>
                    <li className='shadow'>
                        <label className='p-color'>Total saved</label>
                        <p>
                            <span>{currency_formater.format(dashboardData.total_savings)}</span>
                        </p>
                    </li>
                </ul>
            </div>
            
            <div className="group">
                <label className='p-color'>Select Transaction Type: </label>
                <div className='radio-group'>
                    <div className='item'>
                        <label htmlFor="credit" className='mr-1'>Credit</label>
                        <input type='radio' className='mr-1' id="credit" value="credit" 
                        {...register('transaction_type',{
                            required:'Transaction type is required to select',
                            onChange: () => {updateAddTransactionForm()}
                        })}
                        />
                    </div>
                    
                    <div className="navmenu-seperator mr-1 o-2"></div>
                    
                    <div className="item">
                        <label htmlFor="debit" className='mr-1'>Debit</label>
                        <input type='radio' id="debit" name="transaction_type" value="debit" 
                        {...register('transaction_type',{
                            required:'Transaction type is required to select',
                            onChange: () => {updateAddTransactionForm()}
                        })} />
                    </div> 
                </div>   
            </div>
            {errors?.transaction_type?.type === 'required' && <span className='light-orage-color'> {errors?.transaction_type?.message}</span> }
            <div className="group">
                <label className='p-color'>Transaction Amount: </label>
                <Input icon={<i className="bi bi-credit-card-fill"></i>} name={'transaction_amount'} className={errors?.transaction_amount ? 'error':''} required register={register} handleOnChange={updateAddTransactionForm} />
                {errors?.transaction_amount?.type === 'validate' && <span className='light-orage-color'> {errors?.transaction_amount?.message}</span> }
                {errors?.transaction_amount?.type === 'required' && <span className='light-orage-color'> {errors?.transaction_amount?.message}</span> }
            </div>
            <div className="group">
                <label className='p-color'>Transaction Description: </label>
                <Input validateAs='text' icon={<i className="bi bi-credit-card-fill"></i>} name={'transaction_description'}
                 className={errors?.transaction_description ? 'error':''} required register={register} handleOnChange={updateAddTransactionForm} />
                 {errors?.transaction_description?.type === 'validate' && <span className='light-orage-color'> {errors?.transaction_description?.message}</span> }
                 {errors?.transaction_description?.type === 'required' && <span className='light-orage-color'> {errors?.transaction_description?.message}</span> }
            </div>
            <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1' onClick={onCancel }>Cancel</button>
                    <button disabled={disableStatus} className='btn btn-primary' type='submit'>Add</button>
                </div>
        </div>
        </form>
        
    </>
}

export default TransactionAdd