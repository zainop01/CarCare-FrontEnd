import React, { useEffect, useState } from 'react'
import SideNav from '../../components/SideNav'
import TopNav from '../../components/TopNav'
import { Button } from '../../components/Button/Button'
import { FaPlusCircle } from "react-icons/fa";
import Table from '../../components/Table';
import StaticData from '../../config/config.json'
import Pagination from '../../components/Pagination';
import PageSelection from '../../components/PageSelection';

const Services = () => {
  const [servicesList, setServicesList] = useState();
  const [search , setSearch] = useState('');
  const [selectedpage, setSelectedpage] = useState();
  const [dataPerPage, setDataPerPage] = useState(5);

  const payload = {

    name: search,
    pageNo: selectedpage,
    perPage: Number(dataPerPage),

  }

  const getServicesListFun = () => {
    // Make the API request using fetch
  fetch("http://localhost:8000/service/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  })
    .then((response) => response?.json())
    .then((data) => {

      if (data?.success) {
        setServicesList(data.data)
      } else {
        console.log(data?.message); // Show the error message from the API response
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  

     
  useEffect (() => {
      getServicesListFun();
  }, [ selectedpage , dataPerPage ] )

  useEffect (() =>{
    if(search !== ""){
      let timerOut = setTimeout(() =>{
        getServicesListFun();
      } , 500 )
      return () => clearTimeout(timerOut);
    }else{
      getServicesListFun();
    }
  }, [search]  )


  return (
    <>
    <div className="d-flex">
    <div>
      <SideNav />
    </div>
    <div className="w-100" style={{marginLeft: "25rem"}}>
      <TopNav title="Services" />
      <div className="px-5">
        <div className="d-flex justify-content-between align-items-center">
          <div className="search-input my-5">
            <input 
            onChange={(e) => setSearch(e.target.value)}
            type="text" placeholder="Search Services" />
          </div>
          <div className="add-btn mt-5">
            <Button
              abc={() => setModalShow(true)}
              icon={<FaPlusCircle className="fs-3 me-2 mb-1" />}
              title="Add Services" />
          </div>
        </div>
        <Table TableHeading={StaticData.servicesTableHeadings}>
          <tbody>
          {servicesList?.services?.map((val, index) => ( 
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val?.name}</td>
              <td>{val?.price}</td>
              <td>{val?.description}</td>
              <td></td>
            </tr>
            
          ))}
          </tbody>
        </Table>
        <div className="mt-4 d-flex justify-content-between align-items-center">
      <PageSelection
      dataPerPage={(value) => setDataPerPage(value)}
      value={dataPerPage}
    />
    <Pagination
      pageCount={Number(servicesList?.pages)}
      selectedpage={(value) => setSelectedpage(value)}
    />
  </div>
      </div>
     
    </div>
    
  </div>
   
    </>
  )
}

export default Services
