import React, { useEffect, useState } from 'react'
import SideNav from '../../components/SideNav';
import TopNav from '../../components/TopNav';
import '../../styles/scss/style.scss'
import CardsOne from './Component/CardOne';
import CardsTwo from './Component/CardTwo';

// icons
import { IoMdPerson } from "react-icons/io";
import { FaCarSide } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { BsCashCoin } from "react-icons/bs";
import { GiExpense } from "react-icons/gi";
import { GrUpgrade } from "react-icons/gr";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";


// images
import blueline from '../../assets/images/svgs/graph-line-blue.svg';
import greenline from '../../assets/images/svgs/graph-line-green.svg';
import orangeline from '../../assets/images/svgs/graph-line-orange.svg';
import ExpenseImg from '../../assets/images/svgs/graph-line.svg';
import ProfitImg from '../../assets/images/svgs/line-bar.svg';
import ProductsImg from '../../assets/images/svgs/products.svg';
import ServicesImg from '../../assets/images/svgs/services.svg';
// import LineDemo from './Component/LineChart';
import SalesLineChart from './Component/LineChart';

const Dashboard = () => {
  const [countData, setCountData] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/dashboard/analytics/count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(), 
    })
      .then(response => response.json())
      .then(data => {
        // console.log("Data: ", data)
        if(data?.success){
          // console.log(data.success)
          setCountData(data?.data);
        }
        else{
          console.log(data?.message)
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("Data: ", countData);


  const CardOneData = [
    {
      classes: "primary-card mt-4",
      icon: <IoMdPerson className="user-icon" />,
      heading: countData?.totalCustomers,
      text: "Total Customers",
      imgsrc: orangeline,
    },
    {
      classes: "orange-card mt-4",
      icon: <FaCarSide className="vehicle-icon" />,
      heading: countData?.totalVehicles,
      text: "Total Vehicles",
      imgsrc: orangeline,
    },
    {
      classes: "blue-card mt-4",
      icon: <HiBellAlert className="bell-icon" />,
      heading: countData?.totalReminders,
      text: "Total Remainder",
      imgsrc: blueline,
    },
    {
      classes: "green-card mt-4",
      icon: <BsCashCoin className="sale-icon" />,
      heading: countData?.totalSale,
      text: "Total Sale",
      imgsrc: greenline,
    },
  ];
  const CardTwoData = [
    {
      icon: <GiExpense className="cardtwo-icon" />,
      count: countData?.totalExpense,
      title: "Total Expense",
      imgsrc: ExpenseImg,
    },
    {
      icon: <GrUpgrade className="cardtwo-icon" />,
      count: countData?.totalProfit,
      title: "Total Profit",
      imgsrc: ProfitImg,
    },
    {
      icon: <MdOutlineProductionQuantityLimits className="cardtwo-icon" />,
      count: countData?.totalProducts,
      title: "Total Product",
      imgsrc: ProductsImg,
    },
    {
      icon: <MdMiscellaneousServices className="cardtwo-icon" />,
      count: countData?.totalServices,
      title: "Total Services",
      imgsrc: ServicesImg,
    },
  ];


  return (
    <>
      <div className="d-flex dashboard-content">
        <div>
          <SideNav />
          {/* <h1>Hello</h1> */}
        </div>
        <div className='w-100 main-container'>
          <TopNav title="Dashboard" />
          <div className="px-5">
            <div className="main-wrapper">
              <div className="dashboard-title">
                <h1 className="fs-1 fs-md-2 fw-semibold pt-5 pb-2">
                  Good Morning, <span> Nagina Autopoint</span>
                </h1>
              </div>
               {/* Cards One Start */}
               <div className="cardsone-content d-flex flex-wrap justify-content-between">
               {CardOneData.map((val, index) => (
                   <CardsOne
                     key={index}
                     classes={val.classes}
                     icon={val.icon}
                     heading={val.heading}
                     text={val.text}
                     imgsrc={val.imgsrc}
                   />
                 ))}
               </div>
               {/* Cards Two start */}
               <div className="cardstwo-content d-flex flex-wrap justify-content-between">
               {CardTwoData.map((val, index) => (
                   <CardsTwo
                     key={index}
                     icon={val.icon}
                     title={val.title}
                     count={val.count}
                     imgsrc={val.imgsrc}
                   />
                 ))}
               </div>
               {/* Main wrapper div end */}
    <SalesLineChart/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;
