import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Savings Target p/m Achievement Chart',
      },
    },
  };
  
  export const BarChart = ({dashboardData, filterData}) =>{
    console.log(new Date(dashboardData.createdAt).getMonth())
    const currentMonth = new Date().getMonth();
    
    const length = filterData?.length <= 0 ? 1 : filterData?.length+1;
    const currentMonthIndex = length > 1 ? 1 : 0;
    // console.log(length, currentMonthIndex)
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].splice(currentMonth - currentMonthIndex , length);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let chartData = [];
    if(filterData?.length === 0){
      chartData.push({base_limit_pm:dashboardData['base_limit_pm'], limit_pm: dashboardData['limit_pm']})
    }
    if(filterData?.length >=1){
      const data = filterData?.map(({base_limit_pm, limit_pm}, index) => {
        return    {base_limit_pm, limit_pm}
      })
      data.push({base_limit_pm:dashboardData['base_limit_pm'], limit_pm: dashboardData['limit_pm']})
      chartData.push(...data)
    }
    
     const data = {
        labels,
        datasets: [
          {
            label: 'Target p/m to be',
            data: chartData.map(({base_limit_pm}) => (base_limit_pm)),
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
          },
          {
            label: 'Actual Savings p/m',
            data: chartData.map(({limit_pm}) => (limit_pm)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      console.log(data)
    return <Bar options={options} data={data} />
  }

  export default BarChart;