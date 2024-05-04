import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { loginSchema } from "./schemas";
import { PulseLoader } from "react-spinners";
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import "../../styles/scss/style.scss";
// import StaticData from "../../static/config.json"


const initialValues = {
  phone: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        setLoader(true);
        // Make the API request using fetch
        fetch(`http://localhost:8000/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response?.json())
          .then((data) => {
            setLoader(false);

            if (data?.success) {
              toast.success(data?.message); // Show the success message from the API response
              setTimeout(() => {
                localStorage.setItem('TOKEN', data.data._id)
                navigate("/", { replace: true }); // Clear browser history
                // useEffect(() => {
  
                //   if (localStorage.getItem("TOKEN")) {
                //     navigate("/dashboard");
                //   }
                // })
                
              }, 2000);
            } else {
              toast?.error(data?.message); // Show the error message from the API response
            }

            action.resetForm();
          })
          .catch((error) => {
            console.error("Error:", error);
            toast?.error("An error occurred during login.");
            setLoader(false);
          });
      },
    });

  const isPhoneInputValid = !errors.phone && touched.phone;
  const isPasswordInputValid = !errors.password && touched.password;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="d-flex justify-content-center align-items-center text-center  main-container">
      <form onSubmit={handleSubmit}>
        <div className="inner-wrapper bg-white">
          <div>
            <h1 className="my-5 fs-1 fw-bolder">Login</h1>
          </div>
          <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
            <label className="fs-4 mb-2">Phone Number</label>
            <div className="input-container">
              <input
                className={`${isPhoneInputValid ? "input-success" : ""} ${
                  errors.phone && touched.phone ? "input-error" : ""
                }`}
                placeholder="Enter Phone No"
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {isPhoneInputValid && (
                <IoMdCheckboxOutline className="input-icon success-icon fs-4" />
              )}
              {errors.phone && touched.phone && (
                <MdBlock className="input-icon error-icon fs-4" />
              )}
            </div>
            {errors.phone && touched.phone ? (
              <p className="form-error mt-1 fs-5">{errors.phone}</p>
            ) : null}
          </div>
          <div className="d-flex flex-column text-start mb-4 mx-5 input-wraper position-relative">
            <label className="fs-4 mb-2">Password</label>
            <div className="input-container">
              <input
                className={`${isPasswordInputValid ? "input-success" : ""} ${
                  errors.password && touched.password ? "input-error" : ""
                }`}
                placeholder="Enter Password"
                type={passwordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <IoMdEye className="password-icon fs-3" />
                ) : (
                  <IoIosEyeOff  className="password-icon fs-3" />
                )}
              </div>
            </div>
            {errors.password && touched.password ? (
              <p className="form-error  mt-1 fs-5">{errors.password}</p>
            ) : null}
          </div>
          <div>
            <button className="btn main-btn my-4" type="submit" >
              <FaUserCheck className="me-3 mb-1 fs-2" />
              {loader ? <PulseLoader color={"#fff"} size={8} /> : "Login"}
            </button>
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
  );
};

export default Login;
