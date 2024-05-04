import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { IoMdCheckboxOutline } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ToastContainer } from "react-toastify";
import "../../../../styles/scss/style.scss"

const CustomerFilterModal = ({ show, handleClose , filter , onHide}) => {
  const initialValues = {
    name: "",
    vehicleNo: "",
    vehicleBrand: "",
    vehicleModel: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    vehicleNo: Yup.string(),
    vehicleBrand: Yup.string(),
    vehicleModel: Yup.string(),
    phone: Yup.string(),
  });

  const handleSubmit = (values) => {
    filter(values);
    console.log(values);
    onHide();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal show={show}  onHide={handleClose}  centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="main-wrapper">
          <div className="d-flex text-center">
            <form onSubmit={formik.handleSubmit}>
              <div className="inner-wrapper bg-white">
                <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Name</label>
                  <div className="input-container">
                    <input
                      className={formik.touched.name && !formik.errors.name ? "input-success" : ""}
                      placeholder="Enter Name"
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && !formik.errors.name && (
                      <IoMdCheckboxOutline className="input-icon success-icon fs-4" />
                    )}
                  </div>
                </div>
                {/* Repeat the above pattern for other input fields */}
                <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Vehicle No</label>
                  <div className="input-container">
                    <input
                      className={formik.touched.vehicleNo && !formik.errors.vehicleNo ? "input-success" : ""}
                      placeholder="Enter Vehicle No"
                      type="text"
                      name="vehicleNo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.vehicleNo}
                    />
                    {formik.touched.vehicleNo && !formik.errors.vehicleNo && (
                      <IoMdCheckboxOutline className="input-icon success-icon fs-4" />
                    )}
                  </div>
                </div>
                 {/* Repeat the above pattern for other input fields */}
                <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Vehicle Brand</label>
                  <div className="input-container">
                    <input
                      className={formik.touched.vehicleBrand && !formik.errors.vehicleBrand ? "input-success" : ""}
                      placeholder="Enter Vehicle Brand"
                      type="text"
                      name="vehicleBrand"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.vehicleBrand}
                    />
                    {formik.touched.vehicleBrand && !formik.errors.vehicleBrand && (
                      <IoMdCheckboxOutline className="input-icon success-icon fs-4" />
                    )}
                  </div>
                </div>
                  {/* Repeat the above pattern for other input fields */}
                  <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Vehicle Model</label>
                  <div className="input-container">
                    <input
                      className={formik.touched.vehicleModel && !formik.errors.vehicleModel ? "input-success" : ""}
                      placeholder="Enter Vehicle Model"
                      type="text"
                      name="vehicleModel"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.vehicleModel}
                    />
                    {formik.touched.vehicleModel && !formik.errors.vehicleModel && (
                      <IoMdCheckboxOutline className="input-icon success-icon fs-4" />
                    )}
                  </div>
                </div>
                    {/* Repeat the above pattern for other input fields */}
                    <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
                  <label className="fs-4 mb-2">Phone</label>
                  <div className="input-container">
                    <input
                      className={formik.touched.phone && !formik.errors.phone ? "input-success" : ""}
                      placeholder="Enter Phone"
                      type="text"
                      name="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && !formik.errors.phone && (
                      <IoMdCheckboxOutline className="input-icon success-icon fs-4" />
                    )}
                  </div>
                </div>
                <div>
                  <button className="btn main-btn my-4" type="submit" >Filter</button>
                </div>
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
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomerFilterModal;
