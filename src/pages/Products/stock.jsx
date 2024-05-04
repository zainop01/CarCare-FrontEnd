import React, { useEffect, useState } from 'react';
import StaticData from '../../config/config.json';
import Table from '../../components/Table';

import { Button } from '../../components/Button/Button';
import dateformat from 'dateformat';
// import { FaEdit, FaEye } from 'react-icons/fa';

const Stock = () => {
  const [stockData, setStockData] = useState([]);

  const fetchStockData = () => {
    const payload = {
      "name": "",
      "pageNo": 0,
      "perPage": 5
    };

    fetch('http://localhost:8000/product/buy/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (data?.success) {
          setStockData(data.data.allStock);
        } else {
          console.log(data?.message);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  console.log("Data", stockData)

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div>

    
    <div className="customer-add-btn text-end">
    <button className="btn" >
      Add Product
    </button>
  </div>
  <div className="search-input text-start">
  <input
  type="text" placeholder="Search Expense" />
   </div>
      <Table TableHeading={StaticData.productStockTableHeadings}>
        <tbody>
          {stockData.map((val, index) => {
            return (
              <tr key={index}>
                <td>
                  {index + 1}
                </td>
                <td>
                  {val?.name}
                </td>
                <td>
                  {val?.description}
                </td>
                <td>
                  {val?.quantity.$numberDecimal || 0}{" "}
                  {val?.productType === "liquid" ? "ltr" : ""}
                </td>
                <td>
                  {val?.price}
                </td>
                <td>
                  {val.salePrice}
                </td>
                <td>
                  <Button
                    title="Sale Now" />
                </td>
                <td>{dateformat(val.createdAt, 'dd-mmm-yyyy')}</td>
                <td></td>

              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Stock
