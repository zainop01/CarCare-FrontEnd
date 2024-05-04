import React, { useEffect, useState } from 'react';
import SideNav from '../../components/SideNav';
import TopNav from '../../components/TopNav';
import { Button } from '../../components/Button/Button';
import { CiBoxList } from 'react-icons/ci';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PageSelection from '../../components/PageSelection';
import Pagination from '../../components/Pagination';
import Stock from './stock';
import Sale from './sale';
import SaleHistory from './SaleHistory';


const Products = () => {
  return (
    <>
    <div className="customer-wrapper d-flex">
    <div>
      <SideNav />
    </div>
    <div className="w-100" style={{ marginLeft: '25rem' }}>
      <TopNav title="Products" className="" />

      <div className="px-5">
        <div className="d-flex justify-content-end mt-5">

        </div>
        <div className="tabs-container">
        
          <Tabs id="customer-tabs" className="mb-3" defaultActiveKey="Stock">
            <Tab eventKey="Stock" title={`Stock`} tabClassName="stock-user-btn">
              <Stock />
            </Tab>
            
            <Tab eventKey="Sale" title={`Sale`} tabClassName="sale-user-btn">
              <Sale />
            </Tab>
            <Tab eventKey="Sale History" title={`Sale History`} tabClassName="salehistory-user-btn">
              <SaleHistory />
            </Tab>
          </Tabs>
        </div>
        

      </div>
    </div>
  </div>
   
    </>
  )
}

export default Products;
