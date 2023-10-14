import React, { useState } from "react";
import "./Pagination.css";

export default function Pagination({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
  tablePagination,
}) {
  const [pages] = useState(Math.floor(data.length / dataLimit) + 1);

  const [currentPage, setCurrentPage] = React.useState(1);

  function gotoNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function gotoPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changPage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;

    const endIndex = startIndex + dataLimit;

    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      {tablePagination ? (
        getPaginatedData().map((data, idx) => (
          <RenderComponent key={idx} {...data} />
        ))
      ) : (
        <div className="dataContainer d-flex justify-content-center flex-wrap">
          {getPaginatedData().map((data, idx) => (
            <RenderComponent key={idx} {...data} />
          ))}
        </div>
      )}

      {/* Show the next and previous page */}
      {data.length > dataLimit && (
        <div className="pagination">
          <button
            onClick={gotoPreviousPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            Prev
          </button>

          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changPage}
              className={`paginationItem ${
                currentPage === item ? "active" : ""
              }`}
            >
              <span>{item}</span>
            </button>
          ))}

          <button
            onClick={gotoNextPage}
            className={`next ${currentPage >= pages ? "disabled" : ""}`}
          >
            next
          </button>
        </div>
      )}
    </>
  );
}
