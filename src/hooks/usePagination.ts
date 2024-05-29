import { useState, useMemo } from 'react';

// custom hook
// reusable due to the generic type
const usePagination = <T,>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // memoize the computed values for items 
  // decided for useMemo because it's a good practice for optimization in case of large datasets
  // since it only recomputes if the depedency changes
  const currentItems = useMemo(() => {
    if (!items) {
      return [];
    }
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, indexOfFirstItem, indexOfLastItem]);

  const totalPages = useMemo(() => {
    if (!items) { return 0 };
    return Math.ceil(items.length / itemsPerPage);
  }, [items, itemsPerPage]);

  //
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return { currentItems, paginate, totalPages, currentPage };
};

export default usePagination;