import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';

// Client Components
import ClientLayout from "./components/client/ClientLayout";
import MainComponent from "./components/MainComponent";
import Slider from "./components/common/Slider";
import TopNewestServices from "./components/home/TopNewestServices";
import TopMostOrderServices from "./components/home/TopMostOrderServices";
import Menu from "./components/client/Menu";
import NewsList from "./components/news/NewsList";
import NewsDetail from "./components/news/NewsDetail";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";

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
                            <Menu/>
                        </ClientLayout>
                    </>
                }/>
                <Route path="/news" element={
                    <>
                        <Helmet>
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
                            <NewsList/>
                        </ClientLayout>
                    </>
                }/>
                <Route path="/news/:newsId" element={
                    <>
                        <Helmet>
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
                            <NewsDetail/>
                        </ClientLayout>
                    </>
                }/>

                {/* Route cho Admin */}
                <Route path="/admin" element={
                    <>
                        <Helmet>
                            {/* Import CSS của admin */}
                            <link rel="stylesheet" href="/assets/css/style.css"/>
                        </Helmet>
                        <AdminLayout>
                            {/* Thêm các component admin ở đây */}
                            <div>Welcome to Admin Panel</div>
                        </AdminLayout>
                    </>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
