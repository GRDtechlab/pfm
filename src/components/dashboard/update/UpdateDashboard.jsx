/* eslint-disable react/prop-types */
import './update-dashboard.css';
import { useEffect } from 'react'
import {useForm} from 'react-hook-form';
import Input from '../../UI/form/input/Input';
import { useAddTransactionMutation, useUpdateDashboardDataMutation } from '../../../services/pfm-api';
import currency_formater from '../../../Utils/currency-formatter';


const UpdateDashboard = ({record:dashboardData, closeModal}) => {
    const defaultRecord = {grand_total:0,availableBalance:0,total_savings:0,limit_pm:0,salary_pm:0};   
    const {register, reset, handleSubmit, getValues,formState:{errors}} = useForm({mode: "onChange"});
    const [dashboardUpdate] = useUpdateDashboardDataMutation();
    const [addTransaction] = useAddTransactionMutation();

    const updateDashboardFormSubmit = (e, fieldName) => {

        if( isNaN (getValues()[fieldName])){
             reset({...getValues(), [fieldName]:0});
        }
        
        let minus_total_debit_fromSalary = +getValues().salary_pm - +getValues().transactions.debited;
        let final_calculated_salary_afterCreditDebit = minus_total_debit_fromSalary + +getValues().transactions.credited;
        let final_availableBalance = final_calculated_salary_afterCreditDebit - +getValues().limit_pm;
        let grandTotal = final_availableBalance + +getValues().limit_pm + +getValues().total_savings;

        let finalUpdate = {...getValues(), availableBalance:final_availableBalance, grand_total:grandTotal}
        
        reset(finalUpdate);
    }

    const updateInputRadioChange = (e,name) => {
        updateTotalSavings(+name.split('.')[1]);
    }

    const updateTotalSavings = (index) => {
        let value;
        
        if(isNaN(getValues().radio[index].value ) || getValues().radio[index].value === undefined){
            value= 0;
        } 
        else{
            value = +getValues().radio[index].value;
        } 
        
        let updatedTotalSavingsValue = +getValues()[getValues().radio[index]['fieldType']];

        if(getValues().radio[index].type === 'credit'){
            updatedTotalSavingsValue += value;
        }else{
            updatedTotalSavingsValue -= value;
        }
        if(updatedTotalSavingsValue < 0){
            console.log(`radio.${index}.value`)
            getValues().radio[index]['isError'] = true    
        }else{
            getValues().radio[index]['isError'] = false
        }

        getValues().radio[index]['updatedValue'] = updatedTotalSavingsValue;
        getValues().radio[index]['value'] = value;
        getValues().radio[index]['index'] = index;        

        let finalRaio = {...getValues(), radio: [...getValues().radio]    }
        reset(finalRaio)
          
    }
    const isCustomError =() => {
       let length = getValues().radio?.filter(radioField => radioField.isError === true).length;
        return length !== 0;
    }

    const onUpdateTransaction = async (dashboardUpdateData) =>{
        console.log('handle submit called ', dashboardUpdateData)
        await dashboardUpdate(dashboardUpdateData)
        await addTransaction({user_id:dashboardUpdateData.user_id, dashboard:{isUpdated:true, dashboard_update_id:'updateID_Dashboard', grand_total:dashboardUpdateData.grand_total, description:'Updated by Self'}})
    }
    const customHandleSubmit = (formsValue) =>{
        formsValue.radio.forEach((eachRowRadio) => {
            formsValue = {...formsValue, [eachRowRadio['fieldType']] : eachRowRadio['updatedValue'] === 0 ? formsValue[eachRowRadio['fieldType']] :  eachRowRadio['updatedValue']}
        })

        console.log({formsValue})


        // let salaryAfterTotalDebited = formsValue.salary_pm - formsValue.transactions.debited;
        // let salaryAfterTotalCredited = salaryAfterTotalDebited + formsValue.transactions.credited;
        // let availableBalance = salaryAfterTotalCredited - formsValue.limit_pm;
        // let grandTotal = availableBalance + +formsValue.limit_pm + +formsValue.total_savings;
        let grandTotal = +formsValue.availableBalance + +formsValue.limit_pm + +formsValue.total_savings;

        let finalUpdate = {...formsValue,  grand_total:grandTotal  }
        console.log({finalUpdate})    
        onUpdateTransaction(finalUpdate);
        closeModal({open:false, data:defaultRecord});
        
    }

    const cancelModel = () =>{
        closeModal({open:false, data:defaultRecord})
    }

    useEffect(()=> {
        if(dashboardData) {
            reset({radio:[
                {index:null,type:'', value:0, updatedValue:0, label:'Current Total Savings', fieldType:'total_savings', isError:false},
                {index:null,type:'', value:0, updatedValue:0, label:'Current Limit p/m', fieldType:'limit_pm', isError:false},
                {index:null, type:'', value:0, updatedValue:0, label:'Balance', fieldType:'availableBalance', isError:false}
            ], ...dashboardData})
        }
        
    },[dashboardData])

    return <>
        <form className='update-form-container' onSubmit={ handleSubmit(customHandleSubmit) }>
        <div className="group-label shadow">
                <h3> 
                     {currency_formater.format(getValues().availableBalance)}
                </h3>
                <p className='p-color'>Current Balance:</p>
            </div>
            
            {
                getValues().radio && getValues().radio?.map((eachFieldType,index) => {
                    return (
                        <div key={index} className="group shadow group-label" >
                             <label className='flex-d' style={{marginBottom:'0.5em'}} >
                                <span className='flex-1' style={{flexBasis:'50%'}}>{eachFieldType.label}: </span> 
                                <h3 style={{flexBasis:'50%', textAlign:'right'}} className='flex-1'> { currency_formater.format (getValues()[eachFieldType.fieldType])} </h3>
                            </label>
                            <div className='group-type' style={{marginBottom:'0.5em'}}>
                                <p className='font-color'>Select type</p>
                                <div className='radio-group'>
                                    <div className='item'>
                                        <label htmlFor={`credit${index}`} className='mr-1 c-p'>Credit</label>
                                      
                                        <input type='radio' className='mr-1' id= {`credit${index}`}  {...register(`radio.${index}.type`,{
                                                onChange: () => {updateTotalSavings()}
                                        })} value="credit"     />
                                    </div>
                    
                                <div className="navmenu-seperator mr-1 o-2"></div>
                    
                                <div className="item">
                                    <label htmlFor={`debit${index}`} className='mr-1 c-p'>Debit  </label>
                                    <input type='radio' id={`debit${index}`}  {...register(`radio.${index}.type`,{
                                        onChange: () => {updateTotalSavings(index)}
                                    } )} value="debit"/>
                                </div>
                                </div>
                            </div>

                            <Input name={`radio.${index}.value`} className={errors?.radio?.value ? 'error':''} register={register}      handleOnChange={updateInputRadioChange } disabled={getValues().radio[index].type === ''}   />
                            {getValues().radio[index]['updatedValue'] < 0  && <p className='debit mt-1'>Amount must be less of current amount</p>}
                { eachFieldType.type !== '' &&   
                    <label className='flex-d' style={{marginTop:'0.5em'}} >
                        { getValues().radio[index]['updatedValue'] >= 0 &&
                          <span className='flex-1' style={{flexBasis:'50%'}}> Value: <span className={eachFieldType.type === 'credit' ? 'credit' : 'debit'}> {eachFieldType.type} </span> </span> 
                        }
                        <h3 style={{flexBasis:'50%', textAlign:'right'}} className='flex-1 color-primary-dark'> { currency_formater.format (eachFieldType.updatedValue)} </h3>
                    </label>
                }

                        </div>)

                })
            }

            <div className="group">
                <label className='p-color'>Update Salary p/m:</label>
                <Input name={'salary_pm'} register={register} handleOnChange={updateDashboardFormSubmit} />
            </div>
            <div className='modal-bottom-action'>
                <div className='modal-action-group'>
                    <button className='btn btn-light mr-1 shadow' onClick={cancelModel}>Cancel</button>
                    <button className='btn btn-primary shadow' type='submit' disabled={isCustomError()} > Update  </button>
                </div>
            </div>
        </form>
    </>
}

export default UpdateDashboard