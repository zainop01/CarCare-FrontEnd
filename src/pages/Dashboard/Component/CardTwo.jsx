import React from "react";

const CardsTwo = (props) => {
  return (
    <>
      <div className="cardtwo-wrapper mt-4">
        <div className="d-flex">
          <div className="icon-div">{props.icon}</div>
          <div className="text-div ps-3">
            <h1 className="title">{props.title}</h1>
            <p className="count fw-semibold">{props.count}</p>
          </div>
        </div>
        <div className="card-img d-flex justify-content-center align-items-center my-3">
          <img src={props.imgsrc} alt="" className="img-fluid" />
        </div>
      </div>
    </>
  );
};

export default CardsTwo;

