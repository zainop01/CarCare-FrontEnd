import React, { useState, useEffect, Children } from "react";
import { Button } from "../../components/Button/Button";
import "../../styles/scss/style.scss";

const Table = ({ TableHeading, children }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {TableHeading?.map((val, index) => {
              return <th key={index}>{val}</th>;
            })}
          </tr>
        </thead>
        {children}
      </table>
    </div>
  );
};

export default Table;
