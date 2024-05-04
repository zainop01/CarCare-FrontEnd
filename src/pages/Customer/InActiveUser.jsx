import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import StaticData from '../../config/config.json';
import { Button } from '../../components/Button/Button';
import dateformat from 'dateformat';
import { FaEdit, FaEye } from 'react-icons/fa';

const InActiveUser = ({ customerInfo, listUpdate }) => {


  const statusHandlerFun = (e, val) => {
    const newStatus = e.target.value;

    fetch(`http://localhost:8000/customer/update/status/${val._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(data => {
        if (data?.success) {
          listUpdate(); // Update data after status change
        } else {
          console.log(data?.message);
        }
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  return (
    <div>
      <Table TableHeading={StaticData.customerActiveTableHeadings}>
        <tbody>
          {customerInfo?.customers?.map((val, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val.name}</td>
              <td>
                {val?.vehicles?.map((vehicle, index) => (
                  <div key={index}>{vehicle?.vehicleNo}</div>
                ))}
              </td>
              <td>
                <Button title="Create Order" />
              </td>
              <td>
                {val.vehicles.length} , <Button title="Add" />
              </td>
              <td>
                {val.vehicles.map((vehicle, index) => (
                  <div key={index}>{vehicle.vehicleBrand}</div>
                ))}
              </td>
              <td>{dateformat(val.createdAt, 'dd-mmm-yyyy')}</td>
              <td>{val.location}</td>
              <td>{val.phone}</td>
              <td>
                <select
                  name=""
                  id=""
                  value={val?.status}
                  onChange={e => statusHandlerFun(e, val)}
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
    </div>
  );
};

export default InActiveUser;



//Write a program that implements ten classes for Bank Management System.
//named Bank, Head Office ,Branch, Employee, Manager, Staff, Customer, Transaction, Account, Transaction History.
//
//i) Bank class is the top most class Containing Bank Name as data member.
//
//ii) Head Office class will have data of all branches with their branch ID and address.
//
//iii)Branch class will hold data of  Employees and Customers and it will be inherited from head office class.
//
//iv) Employee class will have two Sub-classes of Staff and Manager and their data will remain in Employee class
//
//v) Staff Class will contain name resignation and salary as data members.
//
//vi) Manager Class will have the data about manager like his -name and salary
//
//vii) Customer Class will have Name, Account No., Address, Father's name, CNIC and Father's CNIC data members.
//
//viii) Transaction class will have methods Credit, Debit and Check balance methods
//
//ix) Account class will have Account No. as data member. and create account method
//
//x) Transaction history will contain last transaction information done by specific Account holder.