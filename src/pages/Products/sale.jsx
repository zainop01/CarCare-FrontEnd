import React, { useEffect, useState } from 'react';
import StaticData from '../../config/config.json';
import Table from '../../components/Table';

import { Button } from '../../components/Button/Button';
import dateformat from 'dateformat';
// import { FaEdit, FaEye } from 'react-icons/fa';


const Sale = () => {
  const [saleData, setSaleData] = useState([]);

  const fetchSaleData = () => {
    const payload = {
      "name": "",
      "pageNo": 0,
      "perPage": 5
    };

    fetch('http://localhost:8000/product/sale/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (data?.success) {
          setSaleData(data.data.allSales);
        } else {
          console.log(data?.message);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  console.log("Data", saleData)

  useEffect(() => {
    fetchSaleData();
  }, []);
  
  return (
    <div>

  <div className="search-input text-end my-4">
  <input
  type="text" placeholder="Search Expense" />
   </div>
      <Table TableHeading={StaticData.productSaleTableHeadings}>
        <tbody>
          {saleData.map((val, index) => {
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
                  {val?.buyPrice}
                </td>
                <td>
                  {val.salePrice}
                </td>
                <td>
                {val.discount}
                </td>
                <td>{val.profit}</td>
                <td>{val?.salePrice / val?.quantity.$numberDecimal || 0} (per)</td>
                <td>{dateformat(val?.updatedAt,'dd-mmm-yyyy') || ""}</td>
                <td></td>
              
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Sale
