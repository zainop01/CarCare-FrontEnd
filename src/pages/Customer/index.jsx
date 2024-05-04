// Customer.js
import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav";
import TopNav from "../../components/TopNav";
import { Button } from "../../components/Button/Button";
import { CiBoxList } from "react-icons/ci";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StaticData from "../../config/config.json";
// import AddCustomerModal from './AddCustomerModal'; // Import AddCustomerModal component
import ActiveUser from "./ActiveUser";
import InActiveUser from "./InActiveUser";
import PageSelection from "../../components/PageSelection";
import Pagination from "../../components/Pagination";
import AddCustomerModal from "./Content/CreateCustomer";
import CustomerFilterModal from "./Content/CustomerFilter";
import { GrPowerReset } from "react-icons/gr";

const Customer = () => {
  const [customerInfo, setCustomerInfo] = useState([]);
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [showFilterModal, setFilterShowModal] = useState(false);
  const [addCustomerModal, setAddCustomerShowModal] = useState(false);

  const [updateList, setUpdateList] = useState(false);

  const [tabsKey, setTabsKey] = useState("active");
  // const [updateCustomerData, setUpdateCustomerData] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    vehicleNo: "",
    vehicleBrand: "",
    vehicleModel: "",
    phone: "",
  });

  // const handleAddCustomer = () => {
  //   setShowModal(true);
  // };
  const handleFilterModal = () => {
    setFilterShowModal(true);
  };

  const handleCloseModal = () => {
    setFilterShowModal(false);
  };

  // const handleAddCustomerModal = () => {
  //   setAddCustomerShowModal(true);
  // };

  const fetchCustomerInfo = () => {
    const payload = {
      perPage: Number(dataPerPage),
      pageNo: selectedpage,
      status: tabsKey,
      filter,
    };

    fetch(`${StaticData.apiUrl}/customer/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setCustomerInfo(data.data);
        } else {
          console.log(data?.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchCustomerInfo();
  }, [tabsKey, filter, selectedpage, dataPerPage]);

  useEffect(() => {
    if (updateList) {
      setUpdateList(false);
      fetchCustomerInfo();
    }
  }, [updateList]);

  return (
    <>
      <div className="customer-wrapper d-flex">
        <div>
          <SideNav />
        </div>
        <div className="w-100" style={{ marginLeft: "25rem" }}>
          <TopNav title="Customer" className="" />

          <div className="px-5">
            <div className="d-flex justify-content-end mt-5">
              <div className="filter-btn">
                <Button
                  style="reset"
                  icon={<GrPowerReset className="fs-3 me-2 mb-1" />}
                  title="Reset"
                  onClick={() =>
                    setFilter({
                      name: "",
                      vehicleNo: "",
                      vehicleBrand: "",
                      vehicleModel: "",
                      phone: "",
                    })
                  }
                />
                <Button
                  class="btn"
                  icon={<CiBoxList className="fs-3 me-2 mb-1" />}
                  title="Filter"
                  onClick={handleFilterModal}
                />
              </div>
              <div className="customer-add-btn">
                <button
                  className="btn"
                  onClick={() => setAddCustomerShowModal(true)}
                >
                  Add Customer
                </button>
              </div>
            </div>
            <div className="tabs-container">
              <Tabs
                id="customer-tabs"
                className="mb-3"
                defaultActiveKey="active"
                onSelect={(e) => setTabsKey(e)}
              >
                <Tab
                  eventKey="active"
                  title={`Active User (${customerInfo.activeCustomer})`}
                  tabClassName="active-user-btn"
                >
                  {tabsKey === "active" ? (
                    <ActiveUser
                      customerInfo={customerInfo}
                      listUpdate={fetchCustomerInfo}
                    />
                  ) : (
                    ""
                  )}
                </Tab>
                <Tab
                  eventKey="inactive"
                  title={`Inactive User (${customerInfo.inactiveCustomer})`}
                  tabClassName="inactive-user-btn"
                >
                  {tabsKey === "inactive" ? (
                    <InActiveUser
                      customerInfo={customerInfo}
                      listUpdate={fetchCustomerInfo}
                    />
                  ) : (
                    ""
                  )}
                </Tab>
              </Tabs>
            </div>
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <PageSelection
                dataPerPage={(value) => setDataPerPage(value)}
                value={dataPerPage}
              />
              <Pagination
                pageCount={Number(customerInfo?.pages)}
                selectedpage={(value) => setSelectedpage(value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Render the AddCustomerModal component */}
      <CustomerFilterModal
        show={showFilterModal}
        handleClose={handleCloseModal}
        filter={(values) => setFilter(values)}
        onHide={() => setFilterShowModal(false)}
       
      />
      <AddCustomerModal
        show={addCustomerModal}
        handleClose={() => setAddCustomerShowModal(false)}
        onCreateCustomer={(value)=> setUpdateList(value)}
      />
    </>
  );
};

export default Customer;
