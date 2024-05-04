import React from 'react'
import ThemeToggler from '../ThemeToggler'

const TopNav = (props) => {
  return (
    <div className="topnav-wrapper px-5 py-5 d-flex align-items-center justify-content-between" style={{ height: "50px"  , width: "100%" }}>
    <h2 className="fs-3 ">{props.title}</h2>
    <ThemeToggler/>
    </div>
  )
}

export default TopNav
