import React from "react";
// style
import "../../styles/scss/style.scss";

export default function PageSelection({ dataPerPage, value }) {
  return (
    <>
      <select
        onChange={(e) => dataPerPage(e.target.value)}
        value={value}
        className="page-selection"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  );
}
