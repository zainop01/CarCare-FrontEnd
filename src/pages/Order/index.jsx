import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav";
import TopNav from "../../components/TopNav";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircle } from "react-icons/io";
import Checkbox from "../../components/SharedComponents/checkbox";
import { Button } from "../../components/Button/Button";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import Table from "../../components/Table";
import StaticData from "../../config/config.json";
import { useLocation } from "react-router-dom";

const Order = () => {
  const [serviceList, setServiceList] = useState([]);
  const [newServices, setNewServices] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [createProducts, setCreateProducts] = useState([]);
  const [saleData, setSaleData] = useState([]);
  // const [otherServices , setOtherServices] = useState({
  //   name: "",
  //   price: 0 ,
  // })
  const [selectedSaleProduct, setSelectedSaleProduct] = useState(null);
  const [selectedSaleProductId, setSelectedSaleProductId] = useState("");
  console.log("Sale Id", selectedSaleProductId);
  const [saleProd, setSaleProd] = useState({
    discount: 0,
    quantity: 0,
  });

  // const prodSaleHandler = (e) =>{
  //   const {value , name} = e.target;
  //   console.log(value , name);
  //   setSaleProd({
  //    ...saleProd,
  //     [name] : value
  //   })

  // }
  const handleSaleNow = () => {
    console.log(customer);
    console.log(selectedSaleProduct);
    console.log(saleProd);
    const payload = {
      customerName: customer.name,
      productId: selectedSaleProduct._id,
      name: selectedSaleProduct.name,
      description: selectedSaleProduct.description,
      quantity: Number(saleProd.quantity),
      buyPrice: selectedSaleProduct.price,
      salePrice: selectedSaleProduct.salePrice,
      productType: selectedSaleProduct.productType,
      discount: Number(saleProd.discount),
    };
    console.log("Paylod", payload);

    if (selectedSaleProduct && saleProd.quantity && saleProd.discount) {
      fetch("http://localhost:8000/product/sale/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            const total = selectedSaleProduct.salePrice - saleProd.discount;
            const saleItem = {
              name: selectedSaleProduct.name,
              quantity: saleProd.quantity,
              salePrice: selectedSaleProduct.salePrice,
              discount: saleProd.discount,
              total: total,
            };
            setSaleData([...saleData, saleItem]);
            // Save sale data to localStorage
            localStorage.setItem(
              "saleData",
              JSON.stringify([...saleData, saleItem])
            );
          } else {
            console.log(data?.message);
          }
        });
    }
  };

  const handleReturn = (returnedProduct) => {
    // Remove the returned product from the state
    const updatedSaleProducts = saleProducts.filter(
      (product) => product._id !== returnedProduct._id
    );
    setSaleProducts(updatedSaleProducts);

    // Remove the returned product from localStorage
    const updatedLocalStorage = newServices.filter(
      (product) => product._id !== returnedProduct._id
    );
    localStorage.setItem("newServices", JSON.stringify(updatedLocalStorage));
  };

  console.log("selected Sale producst", selectedSaleProduct);
  console.log("Information", saleProd);

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setSaleProd({
      ...saleProd,
      quantity: value,
    });
  };

  const handleDiscountChange = (e) => {
    const { value } = e.target;
    setSaleProd({
      ...saleProd,
      discount: value,
    });
  };

  // create products api

  // }
  console.log(createProducts);
  console.log("Data", serviceList);

  const serviceListApi = () => {
    fetch("http://localhost:8000/service/list/simple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setServiceList(data?.data);
        } else {
          console.log(data?.message);
        }
      });
  };

  const saleProductsApi = () => {
    fetch("http://localhost:8000/product/buy/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        pageNo: 1,
        perPage: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setSaleProducts(data.data.allStock);
        } else {
          console.log(data?.message);
        }
      });
  };
  console.log(saleProducts);
  useEffect(() => {
    // Load data from localStorage on component mount
    const savedNewServices = JSON.parse(localStorage.getItem("newServices"));
    if (savedNewServices) {
      setNewServices(savedNewServices);
    }
  }, []);

  const addService = (serviceName, servicePrice) => {
    if (serviceName && servicePrice) {
      const newService = { name: serviceName, price: servicePrice };
      const updatedNewServices = [...newServices, newService];
      setNewServices(updatedNewServices);
      localStorage.setItem("newServices", JSON.stringify(updatedNewServices));
    }
  };

  const deleteService = (index) => {
    const updatedNewServices = newServices.filter((_, i) => i !== index);
    setNewServices(updatedNewServices);
    // Save to localStorage
    localStorage.setItem("newServices", JSON.stringify(updatedNewServices));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   formik.setFieldValue(name, value);
  // };

  useEffect(() => {
    serviceListApi();
    saleProductsApi();
    // saleProdFun();
  }, [saleProd]);

  const { state } = useLocation();
  const { customer } = state;
  console.log(customer);

  const initialValues = {
    name: customer.name,
    vehicleNo: "",
    currentMilage: "",
    kmSpeed: "",
    discount: "",
    servicesId: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    vehicleNo: Yup.string().required(),
    currentMilage: Yup.string(),
    kmSpeed: Yup.string(),
    discount: Yup.string(),
  });

  const handleSubmit = (values) => {};

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="order-wrapper d-flex">
        <div>
          <SideNav />
        </div>
        <div className="w-100" style={{ marginLeft: "25rem" }}>
          <TopNav title="Create Order" />
          <div className="order-body px-5">
            <h1 className="mt-5">
              Add Customers <span>Order</span>
            </h1>
            <div className="order-inputs">
              <div className="main-wrapper-order">
                <form onSubmit={formik.handleSubmit} className="mt-5">
                  <div className="row">
                    <div className="col-6">
                      <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                        <label className="fs-4 mb-2">Name</label>
                        <div className="input-container">
                          <input
                            className={`form-control ${
                              formik.touched.name && formik.errors.name
                                ? "input-error"
                                : formik.touched.name && !formik.errors.name
                                ? "input-success"
                                : ""
                            }`}
                            placeholder="Enter Customer Name"
                            disabled
                            // defaultValue={customer.name}
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                          />
                          {formik.values.name && formik.errors.name && (
                            <IoMdCloseCircle className="input-icon error-icon fs-4" />
                          )}
                          {formik.values.name && !formik.errors.name && (
                            <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                          )}
                        </div>
                        {formik.touched.name && formik.errors.name && (
                          <div className="error-message">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Repeat the pattern for other fields */}
                    <div className="col-6">
                      <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                        <label className="fs-4 mb-2">Vehicle No #</label>
                        <div className="input-container">
                          <select
                            className={`form-control ${
                              formik.touched.vehicleNo &&
                              formik.errors.vehicleNo
                                ? "input-error"
                                : formik.touched.vehicleNo &&
                                  !formik.errors.vehicleNo
                                ? "input-success"
                                : ""
                            }`}
                            defaultValue={"Select Vehicle"}
                            placeholder="Enter Vehicle No"
                            type="text"
                            name="vehicleNo"
                            value={formik.values.vehicleNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Select Vehicle</option>
                            {/* Map state data to options */}
                            {customer.vehicles.map((val, index) => (
                              <option key={index} value={val.vehicleNo}>
                                {val.vehicleNo}
                              </option>
                            ))}
                          </select>
                          {formik.values.vehicleNo &&
                            formik.errors.vehicleNo && (
                              <IoMdCloseCircle className="input-icon error-icon fs-4" />
                            )}
                          {formik.values.vehicleNo &&
                            !formik.errors.vehicleNo && (
                              <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                            )}
                        </div>
                        {formik.touched.vehicleNo &&
                          formik.errors.vehicleNo && (
                            <div className="error-message">
                              {formik.errors.vehicleNo}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* Repeat the pattern for other fields */}
                  </div>
                  {/* Select Services */}
                  <h2 className="mt-5">
                    <i>Select Services</i>
                  </h2>
                  <div className="custom-services  p-4">
                    <div className=" d-flex">
                      <div className="row">
                        {serviceList.map((val, index) => (
                          <div className="col-4">
                            <Checkbox
                              key={index}
                              name="servicesId"
                              label={`${val.name}(${val.price})`}
                              formik={formik}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <h3 className="ms-5 mt-5">Others</h3>
                    {newServices.map((val, index) => (
                      <div className="row my-4 other_data">
                        <div className="col-4 ms-5">
                          <input type="text" disabled defaultValue={val.name} />
                        </div>
                        <div className="col-4">
                          <input
                            type="text"
                            disabled
                            defaultValue={val.price}
                          />
                        </div>
                        <div className="col-2">
                          <button onClick={() => deleteService(index)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="row mt-4">
                      <div className="col-5">
                        <div className="d-flex flex-column text-start mb-4 ms-5 input-wraper position-relative">
                          <div className="input-container">
                            <input
                              placeholder="Enter Service Name"
                              type="text"
                              name="serviceName"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.serviceName}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Repeat the pattern for other fields */}
                      <div className="col-5">
                        <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                          <div className="input-container">
                            <input
                              placeholder="Enter Service Price"
                              type="text"
                              name="servicePrice"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.servicePrice}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-2">
                        <Button
                          onClick={() =>
                            addService(
                              formik.values.serviceName,
                              formik.values.servicePrice
                            )
                          }
                          icon={<FaPlus />}
                        />
                        <Button icon={<MdDeleteForever />} />
                      </div>
                      {/* Repeat the pattern for other fields */}
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-4">
                      <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                        <label className="fs-4 mb-2">Current Milage</label>
                        <div className="input-container">
                          <input
                            className={`form-control ${
                              formik.touched.currentMilage &&
                              formik.errors.currentMilage
                                ? "input-error"
                                : formik.touched.currentMilage &&
                                  !formik.errors.currentMilage
                                ? "input-success"
                                : ""
                            }`}
                            placeholder="Enter Current Milage"
                            type="text"
                            name="currentMilage"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.currentMilage}
                          />
                          {formik.values.currentMilage &&
                            formik.errors.currentMilage && (
                              <IoMdCloseCircle className="input-icon error-icon fs-4" />
                            )}
                          {formik.values.currentMilage &&
                            !formik.errors.currentMilage && (
                              <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                            )}
                        </div>
                        {formik.touched.currentMilage &&
                          formik.errors.currentMilage && (
                            <div className="error-message">
                              {formik.errors.currentMilage}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* Repeat the pattern for other fields */}
                    <div className="col-4">
                      <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                        <label className="fs-4 mb-2">Best KM Speed</label>
                        <div className="input-container">
                          <input
                            className={`form-control ${
                              formik.touched.kmSpeed && formik.errors.kmSpeed
                                ? "input-error"
                                : formik.touched.kmSpeed &&
                                  !formik.errors.kmSpeed
                                ? "input-success"
                                : ""
                            }`}
                            placeholder="Enter Vehicle No"
                            type="text"
                            name="kmSpeed"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.kmSpeed}
                          />
                          {formik.values.kmSpeed && formik.errors.kmSpeed && (
                            <IoMdCloseCircle className="input-icon error-icon fs-4" />
                          )}
                          {formik.values.kmSpeed && !formik.errors.kmSpeed && (
                            <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                          )}
                        </div>
                        {formik.touched.kmSpeed && formik.errors.kmSpeed && (
                          <div className="error-message">
                            {formik.errors.kmSpeed}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                        <label className="fs-4 mb-2">
                          Milage To Need Change the Oil
                        </label>
                        <div className="input-container">
                          <input
                            placeholder="Enter Vehicle No"
                            type="text"
                            name="milageOil"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              Number(formik.values.currentMilage) +
                              Number(formik.values.kmSpeed)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Repeat the pattern for other fields */}
                  </div>
                  <hr />
                  {/* Sale Products */}
                  <div className="sale-products">
                    <h2 className="mt-5">
                      <i>Sale Products</i>
                    </h2>
                    <div className="row mt-5">
                      <div className="col-3">
                        <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                          <div className="input-container">
                            <select
                              defaultValue={"Select Products"}
                              placeholder="Select Products"
                              type="text"
                              name="vehicleNo"
                              value={selectedSaleProductId}
                              onChange={(e) => {
                                setSelectedSaleProductId(e.target.value); // Update selectedSaleProductId when select value changes
                                const selectedProduct = saleProducts.find(
                                  (product) =>
                                    product._id ===
                                    JSON.parse(e.target.value)._id
                                );
                                setSelectedSaleProduct(selectedProduct);
                              }}
                              onBlur={formik.handleBlur}
                            >
                              <option value="">Select Products</option>
                              {/* Map state data to options */}
                              {saleProducts.map((val, index) => (
                                <option
                                  key={index}
                                  value={JSON.stringify({
                                    _id: val._id,
                                    name: val.name,
                                    price: val.price,
                                    description: val.description,
                                    productType: val.productType,
                                    salePrice: val.salePrice,
                                  })}
                                >
                                  {`${val.name} (${val.price})`}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      {/* Repeat the pattern for other fields */}
                      <div className="col-3">
                        <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                          <div className="input-container">
                            <input
                              placeholder="Enter Quantity"
                              type="text"
                              name="productQuanitity"
                              onChange={handleQuantityChange}
                              value={saleProd.quantity}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                          <div className="input-container">
                            <input
                              placeholder="Enter Discount"
                              type="text"
                              name="milageOil"
                              onChange={handleDiscountChange}
                              value={saleProd.discount}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                          <Button onClick={handleSaleNow} title="Sale Now" />
                        </div>
                      </div>
                      {/* Repeat the pattern for other fields */}
                    </div>
                    <div className="table-content mt-5">
                      <Table TableHeading={StaticData.createOrderProductTable}>
                        <tbody>
                          {saleData.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.salePrice}</td>
                              <td>{item.discount}</td>
                              <td>{item.total}</td>
                              <td>
                                <button onClick={() => handleReturn(val)}>
                                  Return
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <div className="grandtotal-inputs mt-5">
                      <div className="row">
                        <div className="col-6">
                          <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                            <label className="fs-4 mb-2">Discount</label>
                            <div className="input-container">
                              <input
                                className={`form-control ${
                                  formik.touched.discount &&
                                  formik.errors.discount
                                    ? "input-error"
                                    : formik.touched.discount &&
                                      !formik.errors.discount
                                    ? "input-success"
                                    : ""
                                }`}
                                placeholder="Enter Discount"
                                type="text"
                                name="discount"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.discount}
                              />
                              {formik.values.discount &&
                                formik.errors.discount && (
                                  <IoMdCloseCircle className="input-icon error-icon fs-4" />
                                )}
                              {formik.values.discount &&
                                !formik.errors.discount && (
                                  <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                                )}
                            </div>
                            {formik.touched.discount &&
                              formik.errors.discount && (
                                <div className="error-message">
                                  {formik.errors.discount}
                                </div>
                              )}
                          </div>
                        </div>
                        {/* Repeat the pattern for other fields */}
                        <div className="col-6">
                          <div className="d-flex flex-column text-start mb-4 input-wraper position-relative">
                            <label className="fs-4 mb-2">Grand Total</label>
                            <div className="input-container">
                              <input
                                placeholder="Enter Vehicle No"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Repeat the pattern for other fields */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
