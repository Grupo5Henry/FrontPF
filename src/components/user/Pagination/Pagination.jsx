/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../redux/action";

const Pagination = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.filter.page);
  const maxPages = Math.ceil(
    useSelector((state) => state.maxPages) /
      useSelector((state) => state.filter.amount)
  );
  const pages = [0, 1, 2, 3, 4];

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px w-full justify-center">
        <li key="Prev">
          <a
            href="#"
            onClick={() => {
              if (page > 0) dispatch(updateFilter({ page: page - 1 }));
              return;
            }}
            className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Anterior
          </a>
        </li>
        {pages.map((index) => {
          if (index >= maxPages) return;
          if (page - 1 + index > maxPages) return;
          return (
            <li key={page < 2 ? index : page - 2 + index}>
              <a
                href="#"
                aria-current={
                  (page == index && page <= 2) || (page > 2 && index == 2)
                    ? "page"
                    : false
                }
                onClick={() => {
                  dispatch(
                    updateFilter({ page: page < 2 ? index : page - 2 + index })
                  );
                }}
                className={
                  (page == index && page <= 2) || (page > 2 && index == 2)
                    ? "py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
              >
                {" "}
                {page < 2 ? index : page - 2 + index}{" "}
              </a>
            </li>
          );
        })}
        <li key="Next">
          <a
            href="#"
            onClick={() => {
              if (page + 1 < maxPages)
                dispatch(updateFilter({ page: page + 1 }));
              return;
            }}
            className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
