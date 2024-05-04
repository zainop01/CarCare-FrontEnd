import React, { useEffect, useState } from 'react'
import SideNav from '../../components/SideNav'
import TopNav from '../../components/TopNav'
import Table from '../../components/Table'
import StaticData from '../../config/config.json'
import PageSelection from '../../components/PageSelection'
import Pagination from '../../components/Pagination'
// import { CiSearch } from "react-icons/ci";

const Vehicle = () => {

  const [vehicleList, setVehicleList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);

  const payload = {
    vehicleNo: search,
    perPage: Number(dataPerPage),
    pageNo: selectedpage
}

  // fetch api 

  const getVehicleListFun = () => {
    // using fetch Method
    fetch("http://localhost:8000/vehicle/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response?.json())
      .then((data) => {

        if (data?.success) {
          setVehicleList(data?.data)
        } else {
          console.log(data?.message); // Show the error message from the API response
        }
      })
      .catch((error) => {
        console.log("ERROR:", error)
      })
  }

  console.log(vehicleList)

  useEffect(() => {
    getVehicleListFun()
  },  [selectedpage, dataPerPage])

  useEffect(() => {
    if (search !== "") {
      let timerOut = setTimeout(() => {
        getVehicleListFun();
      }, 500)
      return () => clearTimeout(timerOut);
    }else{
      getVehicleListFun();
    }
  }, [search])

  return (
    <>
    <div className="vehicle-wrapper d-flex">
      <div><SideNav /></div>
      <div className="w-100" style={{marginLeft: "25rem"}}>
        <TopNav title="Vehicle" />
        <div className="main-body px-5">
          <div className="search-input my-5 d-flex justify-content-end">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text" placeholder="Search Vehicle No" />
          </div>
          <Table TableHeading={StaticData.vehicleTableHeadings}>
            <tbody>
              {vehicleList?.vehicles?.map((val, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val?.vehicleNo}</td>
                  <td>{val?.vehicleBrand}</td>
                  <td>{val?.vehicleModel}</td>
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
            pageCount={Number(vehicleList?.pages)}
            selectedpage={(value) => setSelectedpage(value)}
          />
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Vehicle
