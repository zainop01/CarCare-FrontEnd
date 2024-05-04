import Icons from "../../helper/icons";
import menuItems from "../SideNavData";
import {Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/scss/style.scss";
import { FaPowerOff } from "react-icons/fa6";

// import { useState } from "react";

const SideNav = () => {
  const navigate = useNavigate();
function logoutFun(){
localStorage.clear();
localStorage.setItem('isDarkMode', !isDarkMode)
navigate('/login');
}

  return (
    <>
      <div className="sidenav-wrapper">
        <div className="sidebar">
          <div className="top-section d-flex align-items-center py-4 px-4">
            <h1 className="logo fs-3"><span>Car</span>Care</h1>
            <div className="bars fs-4 d-flex ps-2">
              <Icons.FaIcons.FaBars />
            </div>
          </div>
          {
            menuItems.map((item, index) => (
              <>
                <NavLink to={item.path} key={index} className="links d-flex px-4 py-3 my-1 gap-3" activeclassName="active">
                  <div className="icon  fs-3">{item.icon}</div>
                  <div className="link-text ms-3 mt-1">{item.name}</div>
                </NavLink>

              </>

            ))
          }
          
          <Link className="links d-flex px-4 py-4 gap-3" onClick={logoutFun}>   
          <div className="icon  fs-4"><FaPowerOff /></div>
          <div className="link-text ms-3 mt-1">Logout</div>
          </Link>


        </div>
      </div>
    </>);

};

export default SideNav;
