import Pagination from "react-js-pagination";

const Paginate = (props: {
  currentPage: number;
  total: number;
  perPage: number;
  apiMethod: any;
}) => {
  return (
    <div className="mt-3">
      <Pagination
        activePage={props.currentPage}
        totalItemsCount={props.total}
        itemsCountPerPage={props.perPage}
        onChange={(pageNumber) => props.apiMethod(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
        firstPageText="First"
        lastPageText="Last"
      />
    </div>
  );
};

export default Paginate;
