import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as newsService from "../../client/services/NewsService";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import SearchNews from "./SearchNews";
import { jwtDecode } from 'jwt-decode';


const NewsListManagement = () => {
    const [newsEntries, setNewsEntries] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isHardDelete, setIsHardDelete] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [userRole, setUserRole] = useState('ROLE_EMPLOYEE');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 6;

    useEffect(() => {
        const authorities = JSON.parse(localStorage.getItem('authorities'));
        if (authorities) {
            const userRole = authorities[0].authority;
            console.log('userRole', userRole);
            setUserRole(userRole);
        }
        loadNews(currentPage);
    }, [currentPage]);

    const loadNews = async (page) => {
        try {
            let data;
            if (userRole === 'ROLE_ADMIN') {
                data = await newsService.getAllNews(page, pageSize);
            } else if (userRole === 'ROLE_EMPLOYEE') {
                data = await newsService.getAllActiveNews(page, pageSize);
            }
            setNewsEntries(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log('Lỗi khi tải tin tức!');
        }
    };

    const handleSearch = async (searchTerm) => {
        try {
            const data = await newsService.searchNewsByTitle(searchTerm);
            setNewsEntries(data);
        } catch (e) {
            console.log("Lỗi tìm kiếm tin tức");
        }
    }

    const handleDeleteClick = (news, isHard = false) => {
        setSelectedNews(news);
        setIsHardDelete(isHard);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedNews) {
            try {
                if (isHardDelete) {
                    await newsService.deleteHardNews(selectedNews.newsId);
                } else {
                    await newsService.deleteSoftNews(selectedNews.newsId);
                }
                loadNews(currentPage);
                toast.success('Tin tức đã được xóa thành công!');
                setShowDeleteModal(false);
                setSelectedNews(null);
            } catch (error) {
                console.log('Xóa tin tức thất bại!');
            }
        } else {
            toast.error('Xóa tin tức thất bại!');
        }
    };

    const handleSortByDate = () => {
        const sortedNews = [...newsEntries].sort((a, b) => {
            const dateA = new Date(a.publishDate);
            const dateB = new Date(b.publishDate);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setNewsEntries(sortedNews);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="main-content">
                <div className="section-body">
                    <h2 className="section-title">News Management</h2>
                    <p className="section-lead">Manage the news articles on the site.</p>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        {userRole === 'ROLE_ADMIN' && (
                            <Link to="/admin/news/create" className="btn btn-success">
                                <i className="fas fa-plus"></i> Add News
                            </Link>
                        )}
                        <SearchNews onSearch={handleSearch}/>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-md">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Title</th>
                                    <th onClick={handleSortByDate} style={{cursor: 'pointer'}}>
                                        Publish Date{" "}
                                        {sortOrder === 'asc' ? (
                                            <i className="fas fa-arrow-up"></i>
                                        ) : (
                                            <i className="fas fa-arrow-down"></i>
                                        )}
                                    </th>
                                    <th>Author</th>
                                    <th>Views</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {newsEntries.map((news, index) => (
                                    <tr key={news.newsId}>
                                        <td>{index + 1}</td>
                                        <td>{news.title}</td>
                                        <td>{format(new Date(news.publishDate), "dd/MM/yyyy")}</td>
                                        <td>{news.creator.username}</td>
                                        <td>{news.viewCount}</td>
                                        <td>{news.status}</td>
                                        <td>
                                            <Link to={`/news/${news.newsId}`} className="btn btn-secondary"
                                                  title="Detail">
                                                <i className="fas fa-info-circle"></i>
                                            </Link>
                                            {userRole === 'ROLE_ADMIN' && (
                                                <>
                                                    <Link to={`/admin/news/update/${news.newsId}`}
                                                          className="btn btn-primary ml-2" title="Edit">
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <button className="btn btn-danger ml-2"
                                                            onClick={() => handleDeleteClick(news, true)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                    {news.status === 'Active' && (
                                                        <button className="btn btn-warning ml-2"
                                                                onClick={() => handleDeleteClick(news, false)}>
                                                            <i className="fas fa-eraser"></i>
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                            {userRole === 'ROLE_EMPLOYEE' && news.status === 'Active' && (
                                                <button className="btn btn-warning ml-2"
                                                        onClick={() => handleDeleteClick(news, false)}>
                                                    <i className="fas fa-eraser"></i> Xóa mềm
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            <ul className="pagination justify-content-end">
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(i)}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPages - 1}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isHardDelete ? (
                        <>Are you sure you want to <strong>hard delete</strong> the news titled
                            "<strong>{selectedNews?.title}</strong>"?</>
                    ) : (
                        <>Are you sure you want to <strong>soft delete</strong> the news titled "<strong>{selectedNews?.title}</strong>"?</>
                    )}
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
            <ToastContainer/>
        </>
    );
};

export default NewsListManagement;
