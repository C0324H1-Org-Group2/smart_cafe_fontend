import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';

// Client Components
import Slider from "./components/client/common/Slider";
import MainComponent from "./components/client/MainComponent";
import TopNewestServices from "./components/client/home/TopNewestServices";
import ClientLayout from "./components/client/ClientLayout";
import TopMostOrderServices from "./components/client/home/TopMostOrderServices";
import Menu from "./components/client/Menu";
import NewsList from "./components/client/news/NewsList";
import NewsDetail from "./components/client/news/NewsDetail";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import Sidebar from "./components/admin/common/Sidebar";
import TableService from "./components/admin/manager/TableService";
import OrderList from "./components/admin/manager/OrderList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Các route cho Client */}
                <Route path="/" element={
                    <>
                        <Helmet>
                            {/* Import CSS của client */}
                            <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css"/>
                            <link rel="stylesheet" href="/css/animate.css"/>
                            <link rel="stylesheet" href="/css/magnific-popup.css"/>
                            <link rel="stylesheet" href="/css/aos.css"/>
                            <link rel="stylesheet" href="/css/ionicons.min.css"/>
                            <link rel="stylesheet" href="/css/bootstrap-datepicker.css"/>
                            <link rel="stylesheet" href="/css/jquery.timepicker.css"/>
                            <link rel="stylesheet" href="/css/flaticon.css"/>
                            <link rel="stylesheet" href="/css/icomoon.css"/>
                            <link rel="stylesheet" href="/css/style.css"/>
                        </Helmet>
                        <ClientLayout>
                            <Slider/>
                            <MainComponent/>
                            <TopNewestServices/>
                            <TopMostOrderServices/>
                        </ClientLayout>
                    </>
                }/>
                <Route path="/menu" element={
                    <>
                        <Helmet>
                            <link rel="stylesheet" href="/css/style.css"/>
                        </Helmet>
                        <ClientLayout>
                        <Slider/>
                            <Menu/>
                        </ClientLayout>
                    </>
                }/>
                <Route path="/news" element={
                    <>
                        <Helmet>
                            <link rel="stylesheet" href="/css/style.css"/>
                        </Helmet>
                        <ClientLayout>
                            <Slider/>
                            <NewsList/>
                        </ClientLayout>
                    </>
                }/>
                <Route path="/news/:newsId" element={
                    <>
                        <Helmet>
                            <link rel="stylesheet" href="/css/style.css"/>
                        </Helmet>
                        <ClientLayout>
                            <Slider/>
                            <NewsDetail/>
                        </ClientLayout>
                    </>
                }/>

                {/* Route cho Admin */}
                <Route path="/admin" element={
                    <>
                        <Helmet>
                            {/* Import CSS của admin */}
                            <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>

                            <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
                            <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>

                            <link rel="stylesheet" href="/assets/css/components.css"/>
                            <link rel="stylesheet" href="/assets/css/style.css"/>
                        </Helmet>
                        <AdminLayout>
                            {/* Thêm các component admin ở đây */}
                            <Sidebar/>
                        </AdminLayout>
                    </>
                }/>
                <Route path="/admin/service" element={
                    <>
                        <Helmet>
                            {/* Import CSS của admin */}
                            <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>

                            <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
                            <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>

                            <link rel="stylesheet" href="/assets/css/components.css"/>
                            <link rel="stylesheet" href="/assets/css/style.css"/>
                        </Helmet>
                        <AdminLayout>
                            {/* Thêm các component admin ở đây */}
                            <TableService />
                            <Sidebar/>
                        </AdminLayout>
                    </>
                }/>
                <Route path="/admin/order" element={
                    <>
                        <Helmet>
                            {/* Import CSS của admin */}
                            <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>

                            <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
                            <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
                            <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>

                            <link rel="stylesheet" href="/assets/css/components.css"/>
                            <link rel="stylesheet" href="/assets/css/style.css"/>
                        </Helmet>
                        <AdminLayout>
                            {/* Thêm các component admin ở đây */}
                            <OrderList/>
                            <Sidebar/>
                        </AdminLayout>
                    </>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
