import './chart.css';
import { useOutletContext } from "react-router-dom";
import { useGetCurrentUser } from "../../../services/get-current-logged-in-user-hook";
import { useDashboardDataQuery } from "../../../services/pfm-api";
import BarChart from "./BarChart";

export const Chart = () =>{
    const currentUser =  useGetCurrentUser();
    const { user } = useOutletContext();    
    const {dashboardData} = useDashboardDataQuery({user_id:user._id}, {
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
    return <>
    <div className='main-chart'>
        <div className="head-title">
            <div className="left">
                <h1 className='header-color-dark'>Chart </h1>
            </div>
        </div>
        <h2 className='header-color'>1. Bar Chart</h2>
        <BarChart dashboardData={dashboardData} />
    </div>

        
    </>
}

export default Chart;