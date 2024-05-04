import React, { useEffect, useState } from 'react'
import SideNav from '../../components/SideNav';
import TopNav from '../../components/TopNav';
import Table from '../../components/Table';
import StaticData from '../../config/config.json'
const Remainder = () => {
  // const [modalShow, setModalShow] = useState(false);
  const [orderReminder , setOrderReminder] = useState();

  const getRemindersListFun = () => {
    // using fetch Method
    fetch("http://localhost:8000/order/reminder/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({}),
    })
      .then((response) => response?.json())
      .then((data) => {
        if (data?.success) {
          setOrderReminder(data?.data)
        } else {
          console.log(data?.message); // Show the error message from the API response
        }
      })
      .catch((error) => {
        console.log("ERROR:", error)
      })
  }

useEffect(() =>{
  getRemindersListFun();
}, []  )

  return (
    <>
    <div className="d-flex">
        <div>
          <SideNav />
        </div>
        <div className="w-100" style={{marginLeft: "25rem"}}>
          <TopNav title="Remainder" />
          <div className="px-5 pt-4">
            <Table TableHeading={StaticData.reminderTableHeadings}>
            <tbody>
            {orderReminder?.map((val, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val?.customerId?.name}</td>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  {val?.customerId?.phone}
                  {val?.customerId?.whatsapp ? (
                    <i
                      className="text-success ms-2"
                      title="This number have whatsapp"
                    >
                      <Icons.BsIcons.BsWhatsapp />
                    </i>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td>
                <div>
                  {val?.vehicleId?.vehicleNo} ({val?.vehicleId?.vehicleBrand}){" "}
                  <sup>{val?.vehicleId?.vehicleModel}</sup>
                </div>
              </td>
              <td>{val?.remindNumber}</td>
              <td>
                {val?.lastRemindDate
                  ? dateFormat(val?.lastRemindDate, "dd-mmm-yyyy")
                  : "N/A"}
              </td>
              <td>{dateFormat(val?.createdAt, "dd-mmm-yyyy")}</td>
              <td>
               <button 
              //  onClick={() => setModalShow(true)}
               >Remind</button>
                  
              </td>
            </tr>
          ))}
            </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Remainder;
