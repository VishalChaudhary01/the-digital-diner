import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useGetAllMenuItems } from '@/hooks/react-query';
import { useMenuFilters } from '@/hooks/use-menu-filters';

export const MenuPagination = () => {
  const [, setFilters] = useMenuFilters();
  const { data: res } = useGetAllMenuItems();

  if (!res?.data || res.data.pagination.totalPages <= 1) {
    return null;
  }

  const { pageNumber, totalCount, totalPages } = res.data.pagination;

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: newPage }));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const leftBoundary = Math.max(2, pageNumber - 1);
      const rightBoundary = Math.min(totalPages - 1, pageNumber + 1);

      if (leftBoundary > 2) {
        pages.push(-1);
      }

      for (let i = leftBoundary; i <= rightBoundary; i++) {
        pages.push(i);
      }

      if (rightBoundary < totalPages - 1) {
        pages.push(-2);
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => pageNumber > 1 && handlePageChange(pageNumber - 1)}
            className={
              pageNumber <= 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum, idx) =>
          pageNum < 0 ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <span className='flex h-9 w-9 items-center justify-center'>
                ...
              </span>
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={pageNum === pageNumber}
                onClick={() => handlePageChange(pageNum)}
                className='cursor-pointer'
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              pageNumber < totalCount && handlePageChange(pageNumber + 1)
            }
            className={
              pageNumber >= totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
