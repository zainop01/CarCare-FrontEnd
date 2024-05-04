// import React, { useEffect, useState } from 'react'

// const LineChart = () => {
//     const [countData, setCountData] = useState();

//   useEffect(() => {
//     fetch('http://localhost:8000/dashboard/graph/salesAndexpense', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "year": "2023",
//         "month": -1
//     }), 
//     })
//       .then(response => response.json())
//       .then(data => {
//         // console.log("Data: ", data)
//         if(data?.success){
//         //   console.log(data.data)
//           setCountData(data?.data);
//         }
//         else{
//           console.log(data?.message)
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);
// console.log(countData)

//   return (
//     <div>
      
//     </div>
//   )
// }

// export default LineChart



import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function SalesLineChart() {
    const [chartValues, setChartValues] = useState({});
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
      // debugger
    fetch('http://localhost:8000/dashboard/graph/salesAndexpense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
            "year": "2023",
            "month": -1
        }
      ), 
    })
      .then(response => response.json())
      .then(data => {
        // console.log("Data: ", data)
        if(data?.success){
          console.log(data.data)
          setChartValues(data?.data);
        }
        else{
          console.log(data?.message)
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log("chart Data",chartValues)

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: chartValues?.label,
      datasets: [
        {
          label: `Total Expense (${chartValues.expenseValues
            ?.map(Number)
            .reduce((acc, val) => acc + val, 0)})`,
          data: chartValues?.expenseValues,
          fill: false,
          tension: 0.4,
          borderColor: "#dc3545",
        },  
        {
          label: `Total Profit (${chartValues.profitValues
            ?.map(Number)
            .reduce((acc, val) => acc + val, 0)})`,
          data: chartValues?.profitValues,
          fill: false,
          tension: 0.4,
          borderColor: "#28a745",
        },
        {
          label: `Total Sale (${chartValues?.salesValues
            ?.map(Number)
            .reduce((acc, val) => acc + val, 0)})`,
          data: chartValues?.salesValues,
          fill: true,
          tension: 0.4,
          borderColor: "#1339FF",
          backgroundColor: "#cae6ff",
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [chartValues]);

  return (
    <div className="">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
