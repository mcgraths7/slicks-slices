import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledPagination = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  text-align: center;
  border: 1px solid var(--grey);
  border-radius: 5px;
  & > * {
    padding: 1rem;
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <StyledPagination>
      <Link to={`${base}/${prevPage}`} disabled={!hasPrevPage}>
        ↢ Previous
      </Link>
      {Array.from({ length: totalPages }).map((_, idx) => (
        <Link
          className={currentPage === 1 && idx === 0 ? 'current' : ''}
          to={`${base}/${idx > 0 ? idx + 1 : ''}`}
        >
          {idx + 1}
        </Link>
      ))}
      <Link to={`${base}/${nextPage}`} disabled={!hasNextPage}>
        Next ↣
      </Link>
    </StyledPagination>
  );
};

export default Pagination;
