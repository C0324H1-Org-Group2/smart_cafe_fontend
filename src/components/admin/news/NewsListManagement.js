import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as newsService from "../../client/services/NewsService";
import { format } from "date-fns";
import {Button, Modal} from "react-bootstrap";

const NewsListManagement = () => {
    const [newsEntries, setNewsEntries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        const data = await newsService.getAllNews();
        setNewsEntries(data);
    };

    const handleDeleteClick = (news) => {
        setSelectedNews(news);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedNews) {
            await newsService.deleteNews(selectedNews.newsId);
            setNewsEntries(newsEntries.filter((n) => n.newsId !== selectedNews.newsId))
            setShowDeleteModal(false);
            setSelectedNews(null);
        }
    };

    const indexOfLastEntry = currentPage * itemsPerPage;
    const indexOfFirstEntry = indexOfLastEntry - itemsPerPage;
    const currentEntries = newsEntries.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(newsEntries.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const visiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(pageNumbers.length, startPage + visiblePages - 1);

    return (
        <>
            <div className="main-content">
                <div className="section-body">
                    <h2 className="section-title">News Management</h2>
                    <p className="section-lead">Manage the news articles on the site.</p>
                    <div className="card-header">
                        <Link to="/admin/news/create" className="btn btn-success">
                            <i className="fas fa-plus"></i> Add News
                        </Link>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-md">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Title</th>
                                    <th>Publish Date</th>
                                    <th>Author</th>
                                    <th>Views</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentEntries.map((news, index) => (
                                    <tr key={news.newsId}>
                                        <td>{indexOfFirstEntry + index + 1}</td>
                                        <td>{news.title}</td>
                                        <td>{format(new Date(news.publishDate), "dd/MM/yyyy")}</td>
                                        <td>{news.creator.username}</td>
                                        <td>{news.viewCount}</td>
                                        <td>
                                            <Link to={`/news/${news.newsId}`} className="btn btn-secondary"
                                                  title="Detail">
                                                <i className="fas fa-info-circle"></i>
                                            </Link>
                                            <Link to={`/news/edit/${news.newsId}`} className="btn btn-primary ml-2"
                                                  title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button className="btn btn-danger ml-2" onClick={() => handleDeleteClick(news)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card-footer text-right">
                        <nav className="d-inline-block">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                                        <i className="fas fa-chevron-left"></i>
                                    </Link>
                                </li>
                                {startPage > 1 && (
                                    <>
                                        <li className="page-item">
                                            <Link className="page-link" to="#" onClick={() => paginate(1)}>1</Link>
                                        </li>
                                        {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                                    </>
                                )}
                                {pageNumbers.slice(startPage - 1, endPage).map((number) => (
                                    <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
                                        <Link className="page-link" to="#" onClick={() => paginate(number)}>
                                            {number}
                                        </Link>
                                    </li>
                                ))}
                                {endPage < pageNumbers.length && (
                                    <>
                                        {endPage < pageNumbers.length - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                                        <li className="page-item">
                                            <Link className="page-link" to="#" onClick={() => paginate(pageNumbers.length)}>{pageNumbers.length}</Link>
                                        </li>
                                    </>
                                )}
                                <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                                    <Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
                                        <i className="fas fa-chevron-right"></i>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the news titled "<strong>{selectedNews?.title}</strong>"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewsListManagement;
