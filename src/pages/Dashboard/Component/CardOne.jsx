import React from "react";

const CardsOne = (props) => {
  return (
    <>
      <div className={props.classes} id="cardone-container">
        <div className="icon-div">{props.icon}</div>
        <div className="text-div pt-4 pb-2 ">
          <div className="number fw-semibold">{props.heading}</div>
          <div className="title">{props.text}</div>
        </div>
        <div className="vector-img">
          <img src={props.imgsrc} alt="" className="img-fluid" />
        </div>
      </div>
    </>
  );
};

export default CardsOne;