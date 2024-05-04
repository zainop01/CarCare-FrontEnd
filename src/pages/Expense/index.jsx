import React, { useEffect, useState } from 'react'
import SideNav from '../../components/SideNav'
import TopNav from '../../components/TopNav'
import { Button } from '../../components/Button/Button'
import { FaPlusCircle } from "react-icons/fa";
import Table from '../../components/Table';
import StaticData from '../../config/config.json'
import dateFormat from "dateformat";
import DateFilter from '../../components/DateFilter';
import Pagination from '../../components/Pagination';
import PageSelection from '../../components/PageSelection';
import addExpense from './Component/addExpense';


const Expense = () =>{
  const [modalShow, setModalShow] = useState(false);
  const [expenseList, setExpenseList] = useState();
  const [search, setSearch] = useState('');
  const [selectedpage, setSelectedpage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [dateFilter, setDateFilter] = useState({
    fromDate: dateFormat(new Date(),  "yyyy-mm-dd"),
    toDate: dateFormat(new Date(),  "yyyy-mm-dd")
  })


  const payload = {
    title: search,
    fromDate: dateFilter.fromDate,
    toDate: dateFilter.toDate,
    pageNo: selectedpage,
    perPage: Number(dataPerPage)
  }



  const getExpenseListFun = () => {
    // Make the API request using fetch
    fetch('http://localhost:8000/expense/list', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    })
      .then((response) => response?.json())
      .then((data) => {

        if (data?.success) {
          setExpenseList(data.data)
        } else {
          console.log(data?.message); // Show the error message from the API response
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }



  useEffect(() => {
    getExpenseListFun();
  }, [])
  useEffect(() => {
    if (search !== "") {
      let timerOut = setTimeout(() => {
        getExpenseListFun();
      }, 500)
      return () => clearTimeout(timerOut);
    }else{
      getExpenseListFun();
    }
  }, [search])

  return (
    <>
    <div className="d-flex">
        <div>
          <SideNav />
        </div>
        <div className="w-100" style={{marginLeft: "25rem"}}>
          <TopNav title="Expense" />
          <div className="px-5">
            <div className="d-flex justify-content-between align-items-center">
              <div className="search-input my-5">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text" placeholder="Search Expense" />
              </div>
              <div className="add-btn mt-5">
                <Button
                  abc={() => setModalShow(true)}
                  icon={<FaPlusCircle className="fs-3 me-2 mb-1" />}
                  title="Add Expense" />
                  <addExpense
                  show={modalShow}
                 onHide={() => setModalShow(false)}
                      />
            
            </div>
            </div>
            <DateFilter
            dateFilter={dateFilter}
            setDateFilter={(value) => setDateFilter(value)}
            clickEvent={getExpenseListFun}
          />
            <Table TableHeading={StaticData.expenseTableHeadings}>
              <tbody>
                {expenseList?.expenses?.map((val, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val?.title}</td>
                    <td>{val?.amount }</td>
                    <td>{val?.description}</td>
                    <td>{dateFormat(val?.createdAt, "dd-mmm-yyyy")}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="mt-5 d-flex justify-content-between align-items-center">
            <PageSelection
              dataPerPage={(value) => setDataPerPage(value)}
              value={dataPerPage}
            />
            <Pagination
              pageCount={Number(expenseList?.pages)}
              selectedpage={(value) => setSelectedpage(value)}
            />
          </div>
            
          </div>
        </div>
      </div>
   
    </>
  )
}

export default Expense

