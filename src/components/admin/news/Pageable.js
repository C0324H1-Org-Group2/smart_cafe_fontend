// import {Link} from "react-router-dom";
// import React from "react";
//
// import {useState} from "react";
//

// const paginate = (pageNumber) => setCurrentPage(pageNumber);
//
// const pageNumbers = [];
// for (let i = 1; i <= Math.ceil(newsEntries.length / itemsPerPage); i++) {
//     pageNumbers.push(i);
// }
//
// const visiblePages = 5;
// const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
// const endPage = Math.min(pageNumbers.length, startPage + visiblePages - 1);
//
// <div className="card-footer text-right">
//     <nav className="d-inline-block">
//         <ul className="pagination mb-0">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                 <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
//                     <i className="fas fa-chevron-left"></i>
//                 </Link>
//             </li>
//             {startPage > 1 && (
//                 <>
//                     <li className="page-item">
//                         <Link className="page-link" to="#" onClick={() => paginate(1)}>1</Link>
//                     </li>
//                     {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//                 </>
//             )}
//             {pageNumbers.slice(startPage - 1, endPage).map((number) => (
//                 <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
//                     <Link className="page-link" to="#" onClick={() => paginate(number)}>
//                         {number}
//                     </Link>
//                 </li>
//             ))}
//             {endPage < pageNumbers.length && (
//                 <>
//                     {endPage < pageNumbers.length - 1 &&
//                         <li className="page-item disabled"><span className="page-link">...</span></li>}
//                     <li className="page-item">
//                         <Link className="page-link" to="#"
//                               onClick={() => paginate(pageNumbers.length)}>{pageNumbers.length}</Link>
//                     </li>
//                 </>
//             )}
//             <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
//                 <Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
//                     <i className="fas fa-chevron-right"></i>
//                 </Link>
//             </li>
//         </ul>
//     </nav>
// </div>
