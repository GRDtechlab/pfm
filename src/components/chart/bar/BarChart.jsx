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
  
  
  

  export const BarChart = ({dashboardData}) =>{
    console.log(new Date(dashboardData.createdAt).getMonth())
    const currentMonth = new Date().getMonth();
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].splice(currentMonth, 12 -currentMonth);
    
     const data = {
        labels,
        datasets: [
          {
            label: 'Target p/m to be',
            data: [dashboardData?.base_limit_pm],
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
          },
          {
            label: 'Actual Savings p/m',
            data: [dashboardData?.limit_pm],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      
    return <Bar options={options} data={data} />
  }

  export default BarChart;