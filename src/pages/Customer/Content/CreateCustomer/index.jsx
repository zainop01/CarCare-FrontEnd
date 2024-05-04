import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useFormik } from "formik";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircle } from "react-icons/io";
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";
import "../../../../styles/scss/style.scss";
import StaticData from "../../../../config/config.json";
import Checkbox from '../../../../components/SharedComponents/checkbox';

const AddCustomerModal = ({ show, handleClose, onCreateCustomer }) => {

  const initialValues = {
    name: "",
    vehicleNo: "",
    vehicleBrand: "",
    vehicleModel: "",
    location: "",
    whatsapp: false,
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    vehicleNo: Yup.string(),
    vehicleBrand: Yup.string().required("Vehicle Brand is required"),
    vehicleModel: Yup.string().required("Vehicle Model is required"),
    location: Yup.string().required("Location is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log({...values,status:"active"})
      fetch(`${StaticData.apiUrl}/customer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...values,status:"active"}),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success("Customer added successfully!");
          onCreateCustomer(true);
          handleClose(); // Close the modal upon successful submission
        } else {
          toast.error(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('An error occurred while adding the customer.');
      });
    },
  });

  return (
    <Modal show={show} onHide={handleClose} centered className='add-customer-body' size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="main-wrapper-addcustomers">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Name</label>
                  <div className="input-container">
                    <input
                      className={`form-control ${formik.touched.name && formik.errors.name ? "input-error" : formik.touched.name && !formik.errors.name ? "input-success" : ""}`}
                      placeholder="Enter Customer Name"
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
                    <div className="error-message">{formik.errors.name}</div>
                  )}
                </div>
              </div>
              {/* Repeat the pattern for other fields */}
              <div className="col-6">
                <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Vehicle No #</label>
                  <div className="input-container">
                    <input
                      className={`form-control ${formik.touched.vehicleNo && formik.errors.vehicleNo ? "input-error" : formik.touched.vehicleNo && !formik.errors.vehicleNo ? "input-success" : ""}`}
                      placeholder="Enter Vehicle No"
                      type="text"
                      name="vehicleNo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.vehicleNo}
                    />
                    {formik.values.vehicleNo && formik.errors.vehicleNo && (
                      <IoMdCloseCircle className="input-icon error-icon fs-4" />
                    )}
                    {formik.values.vehicleNo && !formik.errors.vehicleNo && (
                      <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                    )}
                  </div>
                  {formik.touched.vehicleNo && formik.errors.vehicleNo && (
                    <div className="error-message">{formik.errors.vehicleNo}</div>
                  )}
                </div>
              </div>
              {/* Repeat the pattern for other fields */}
              
            </div>
           {formik.values.vehicleNo ? 
           <div className="row">
           <div className="col-6">
             <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
               <label className="fs-4 mb-2">Vehicle Brand</label>
               <div className="input-container">
                 <input
                   className={`form-control ${formik.touched.vehicleBrand && formik.errors.vehicleBrand ? "input-error" : formik.touched.vehicleBrand && !formik.errors.vehicleBrand ? "input-success" : ""}`}
                   placeholder="Enter Vehicle Brand"
                   type="text"
                   name="vehicleBrand"
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.vehicleBrand}
                 />
                 {formik.values.vehicleBrand && formik.errors.vehicleBrand && (
                   <IoMdCloseCircle className="input-icon error-icon fs-4" />
                 )}
                 {formik.values.vehicleBrand && !formik.errors.vehicleBrand && (
                   <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                 )}
               </div>
               {formik.touched.vehicleBrand && formik.errors.vehicleBrand && (
                 <div className="error-message">{formik.errors.vehicleBrand}</div>
               )}
             </div>
           </div>
           {/* Repeat the pattern for other fields */}
           <div className="col-6">
             <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
               <label className="fs-4 mb-2">Vehicle Model</label>
               <div className="input-container">
                 <input
                   className={`form-control ${formik.touched.vehicleModel && formik.errors.vehicleModel ? "input-error" : formik.touched.vehicleModel && !formik.errors.vehicleModel ? "input-success" : ""}`}
                   placeholder="Enter Vehicle Model"
                   type="text"
                   name="vehicleModel"
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.vehicleModel}
                 />
                 {formik.values.vehicleModel && formik.errors.vehicleModel && (
                   <IoMdCloseCircle className="input-icon error-icon fs-4" />
                 )}
                 {formik.values.vehicleModel && !formik.errors.vehicleModel && (
                   <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                 )}
               </div>
               {formik.touched.vehicleModel && formik.errors.vehicleModel && (
                 <div className="error-message">{formik.errors.vehicleModel}</div>
               )}
             </div>
           </div>

           {/* Repeat the pattern for other fields */}
           
         </div>

: ""
          }
            
            <div className="row">
              <div className="col-6">
                <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Location</label>
                  <div className="input-container">
                    <input
                      className={`form-control ${formik.touched.location && formik.errors.location ? "input-error" : formik.touched.location && !formik.errors.location ? "input-success" : ""}`}
                      placeholder="Enter Location"
                      type="text"
                      name="location"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                    />
                    {formik.values.location && formik.errors.location && (
                      <IoMdCloseCircle className="input-icon error-icon fs-4" />
                    )}
                    {formik.values.location && !formik.errors.location && (
                      <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                    )}
                  </div>
                  {formik.touched.location && formik.errors.location && (
                    <div className="error-message">{formik.errors.location}</div>
                  )}
                </div>
              </div>
              {/* Repeat the pattern for other fields */}
              <div className="col-6">
                <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Phone #</label>
                  <div className="input-container">
                    <input
                      className={`form-control ${formik.touched.phone && formik.errors.phone ? "input-error" : formik.touched.phone && !formik.errors.phone ? "input-success" : ""}`}
                      placeholder="Enter Phone"
                      type="text"
                      name="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.values.phone && formik.errors.phone && (
                      <IoMdCloseCircle className="input-icon error-icon fs-4" />
                    )}
                    {formik.values.phone && !formik.errors.phone && (
                      <IoMdCheckmarkCircleOutline className="input-icon success-icon fs-4" />
                    )}
                  </div>
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="error-message">{formik.errors.phone}</div>
                  )}
                </div>
              </div>
              {/* Repeat the pattern for other fields */}
              
            </div>
            <Checkbox name={"whatsapp"} label={"Do You Have Whatsapp?"} formik={formik} />
            <div className="d-flex justify-content-center">
              <button className="btn main-btn my-4" type="submit">Submit</button>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="toaster fs-4 text-start"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerModal;
