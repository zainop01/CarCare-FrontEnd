import React from "react";
// Pagination
import ReactPaginate from "react-paginate";
// React-icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// import Icons from "@helper/icons";
// style
import "../../styles/scss/style.scss";

const Pagination = ({ pageCount, selectedpage }) => {
  const handlePageClick = (data) => {
    selectedpage(data.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        previousLabel={<IoIosArrowBack />}
        nextLabel={<IoIosArrowForward />}
        breakLabel={"..."}
        pageCount={Number(pageCount)}
        marginPagesDisplayed={"2"}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-link"}
        nextClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Pagination;
