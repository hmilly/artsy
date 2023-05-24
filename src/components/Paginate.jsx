import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Paginate = ({ arrLength, pageNo, setPageNo, noToDisplay }) => {
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const setPgNos = () => setMaxPage(Math.ceil(arrLength / noToDisplay));
    setPgNos();
  }, [arrLength, noToDisplay]);

  let arr = [];

  for (let num = 1; num <= maxPage; num++) {
    arr.push(
      <Pagination.Item
        key={num}
        active={num === pageNo}
        onClick={() => setPageNo(num)}
      >
        {num}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="m-0 d-flex justify-content-center gap-2">
      <Pagination.Item
        key={0}
        onClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
        disabled={pageNo === 1}
      >
        <BsArrowLeft />
      </Pagination.Item>
      {arr}
      <Pagination.Item
        key={maxPage + 1}
        onClick={() => pageNo < maxPage && setPageNo(pageNo + 1)}
        disabled={pageNo === maxPage}
      >
        <BsArrowRight />
      </Pagination.Item>
    </Pagination>
  );
};

export default Paginate;
