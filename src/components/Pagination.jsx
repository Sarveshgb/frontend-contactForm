import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  if (totalPosts <= postsPerPage) return null;

  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Logic to display limited page numbers with ellipsis
  let displayedPages = [];
  if (totalPages <= 5) {
    displayedPages = pageNumbers;
  } else {
    if (currentPage <= 3) {
      displayedPages = [...pageNumbers.slice(0, 5), '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      displayedPages = [1, '...', ...pageNumbers.slice(totalPages - 5)];
    } else {
      displayedPages = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      ];
    }
  }

  return (
    <nav className="pagination">
      <button 
        className="pagination-arrow"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleLeft />
      </button>
      
      <ul className="pagination-list">
        {displayedPages.map((page, index) => (
          <li key={index} className="pagination-item">
            {page === '...' ? (
              <span className="pagination-ellipsis">...</span>
            ) : (
              <button
                onClick={() => paginate(page)}
                className={`pagination-link ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
      
      <button 
        className="pagination-arrow"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaAngleRight />
      </button>
    </nav>
  );
};

export default Pagination;