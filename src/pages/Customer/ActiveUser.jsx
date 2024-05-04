import React, { useEffect, useState } from "react";
import StaticData from "../../config/config.json";
import Table from "../../components/Table";
import { Button } from "../../components/Button/Button";
import dateformat from "dateformat";
import { FaEdit, FaEye } from "react-icons/fa";
import AddVehicleModal from "./Content/CreateVehicle";
import {Link, NavLink, useNavigate } from "react-router-dom";


const ActiveUser = ({ customerInfo, listUpdate }) => {
  const navigate = useNavigate();
  const [addVehicleShowModal, setAddVehicleShowModal] = useState(false);
  const [selectedCustomer , setSelectedCustomer] =useState({})
  console.log(selectedCustomer)
  console.log(customerInfo , "customer Information")

  const statusHandlerFun = (e, val) => {
    const newStatus = e.target.value;

    fetch(`http://localhost:8000/customer/update/status/${val._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          listUpdate(); // Update data after status change
        } else {
          console.log(data?.message);
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div>
      <Table TableHeading={StaticData.customerActiveTableHeadings}>
        <tbody>
          {customerInfo.customers &&
            customerInfo.customers.map((val, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{val.name}</td>
                <td>
                  {val?.vehicles?.map((vehicle, index) => (
                    <div key={index}>{vehicle?.vehicleNo}</div>
                  ))}
                </td>
                <td>
                  <Button
                  onClick={() => navigate('/order' , {state: {customer: val}})}
                  title="Create Order" />
                </td>
                <td>
                  {val.vehicles.length} ,
                  <Button
                    onClick={() => {setSelectedCustomer(val) , setAddVehicleShowModal(true)}}
                    title="Add"
                  />
                </td>
                <td>
                  {val.vehicles.map((vehicle, index) => (
                    <div key={index}>{vehicle.vehicleBrand}</div>
                  ))}
                </td>
                <td>{dateformat(val.createdAt, "dd-mmm-yyyy")}</td>
                <td>{val.location}</td>
                <td>{val.phone}</td>
                <td>
                  <select
                    name=""
                    id=""
                    value={val?.status}
                    onChange={(e) => statusHandlerFun(e, val)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td>
                  <FaEdit />
                  <FaEye />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <AddVehicleModal
        show={addVehicleShowModal}
        handleClose={() => setAddVehicleShowModal(false)}
        selectedCustomer={selectedCustomer}
      />
    </div>
  );
};

export default ActiveUser;
