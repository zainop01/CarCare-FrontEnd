// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Router from "./routes"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ThemeToggler from "./components/ThemeToggler";
// import StaticExample from "./components/Model/TokenExpire"
//redux
// import { useSelector, useDispatch } from "react-redux";
// import { loginData, loginSignal } from "./slice/login/loginSlice";

function App() {
  // const [tokenModel, setTokenModel] = useState(false);
  // const dispatch = useDispatch();
  // const { signal } = useSelector((state) => state.loginInfo);
  // const navigate = useNavigate();

  // //  Make the API request using fetch
  //  fetch(`http://localhost:8000/admin/verify/660e77a5d8ff6f8d5cd0a8a8`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(values),
  // })
  //   .then((response) => response?.json())
  //   .then((response) => {
  //     console.log(response);
  //     const adminData = response.data.data;
  //     if (response.data.success) {
  //       dispatch(loginData(adminData || {}));
  //     } else {
  //       setTokenModel(true);
  //     }
  //   });

  //   useEffect(() => {
  //     const token = localStorage.getItem("TOKEN");
  //     if (signal) {
  //       dispatch(loginSignal(false));
  //       if (token) {
  //         console.log("Token available: ", token);
  //         fetchAndVerifyAdmin(token);
  //       }
  //     }
  //   }, [signal]);


  return (
    <>
    
     <Router />
  </>
  )
}

export default App;
