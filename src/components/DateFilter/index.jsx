import React from "react";

const DateFilter = ({dateFilter , setDateFilter , clickEvent}) =>{

return(
    <>
    <div className="d-flex align-items-center">
        <label>From</label>
      <input 
      onChange={(e) => setDateFilter({...dateFilter, fromDate: e.target.value})}
      type="date"
      value={dateFilter.fromDate}
       />
       <span className="fs-1 mx-1"> - </span>
       <label>To</label>
      <input 
      onChange={(e) => setDateFilter({...dateFilter, toDate: e.target.value})}
      type="date"
      value={dateFilter.toDate}
       />
       <button
       onClick={clickEvent}
       className="mx-2 mt-2 align-self-center"
       >
        Find
       </button>
    </div>
    </>
)

}

export default DateFilter;