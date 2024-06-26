import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = (props) => {
  const { Component } = props
const navigate = useNavigate();

useEffect(() => {
  const login = localStorage.getItem('TOKEN');
  if (!login) {
    navigate('/login');
  }
}, [navigate]);


  return (
    <div>
      <Component />
    </div>
  )
}

export default PrivateRoute;
