// import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Helmet } from 'react-helmet';
// import 'react-toastify/dist/ReactToastify.css';
// import {ToastContainer} from "react-toastify";
// // Client Components
// import Slider from "./components/client/common/Slider";
// import MainComponent from "./components/client/MainComponent";
// import TopNewestServices from "./components/client/home/TopNewestServices";
// import ClientLayout from "./components/client/ClientLayout";
// import TopMostOrderServices from "./components/client/home/TopMostOrderServices";
// import Menu from "./components/client/Menu";
// import NewsList from "./components/client/news/NewsList";
// import NewsDetail from "./components/client/news/NewsDetail";
// import CounterSection from "./components/client/home/CounterSection";
//
// import RegisterForm from "./components/client/RegisterForm"; // Import RegisterForm component
//
// // Admin Components
// import AdminLayout from "./components/admin/AdminLayout";
// import Sidebar from "./components/admin/common/Sidebar";
// import TableService from "./components/admin/manager/TableService";
// import FeedbackList from "./components/admin/feedbackList";
// import Sell from "./components/admin/Sell";
// import LoginForm from "./components/admin/Login/LoginForm";
// import OrderList from "./components/admin/manager/OrderList";
// import NewsForm from "./components/admin/news/NewsForm";
// import EmployeeDetailService from "./components/admin/services/EmployeeDetailService";
//
//
// function App() {
//     return (
//         <>
//         <BrowserRouter>
//             <Routes>
//                 {/* Các route cho Client */}
//                 <Route path="/" element={
//                     <>
//                         <Helmet>
//                             {/* Import CSS của client */}
//                             <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/css/animate.css"/>
//                             <link rel="stylesheet" href="/css/magnific-popup.css"/>
//                             <link rel="stylesheet" href="/css/aos.css"/>
//                             <link rel="stylesheet" href="/css/ionicons.min.css"/>
//                             <link rel="stylesheet" href="/css/bootstrap-datepicker.css"/>
//                             <link rel="stylesheet" href="/css/jquery.timepicker.css"/>
//                             <link rel="stylesheet" href="/css/flaticon.css"/>
//                             <link rel="stylesheet" href="/css/icomoon.css"/>
//                             {/*<link rel="stylesheet" href="/css/owl.carousel.min.css"/>*/}
//                             {/*<link rel="stylesheet" href="/css/owl.theme.default.min.css"/>*/}
//                             <link rel="stylesheet" href="/css/style.css"/>
//                         </Helmet>
//                         <ClientLayout>
//                             <Slider/>
//                             <MainComponent/>
//                             <TopNewestServices/>
//                             <CounterSection />
//                             <TopMostOrderServices/>
//                         </ClientLayout>
//                     </>
//                 }/>
//                 <Route path="/menu" element={
//                     <>
//                         <Helmet>
//                             <link rel="stylesheet" href="/css/icomoon.css"/>
//                             <link rel="stylesheet" href="/css/style.css"/>
//                         </Helmet>
//                         <ClientLayout>
//                             <Slider/>
//                             <Menu/>
//                         </ClientLayout>
//                     </>
//                 }/>
//                 <Route path="/news" element={
//                     <>
//                         <Helmet>
//                             <link rel="stylesheet" href="/css/icomoon.css"/>
//                             <link rel="stylesheet" href="/css/style.css"/>
//                         </Helmet>
//                         <ClientLayout>
//                         <Slider/>
//                             <NewsList/>
//                         </ClientLayout>
//                     </>
//                 }/>
//                 <Route path="/news/:newsId" element={
//                     <>
//                         <Helmet>
//                             <link rel="stylesheet" href="/css/icomoon.css"/>
//                             <link rel="stylesheet" href="/css/style.css"/>
//                         </Helmet>
//                         <ClientLayout>
//                         <Slider/>
//                             <NewsDetail/>
//                         </ClientLayout>
//                     </>
//                 }/>
//
//                 {/* Route cho Admin */}
//                 <Route path="/admin" element={
//                     <>
//                         <Helmet>
//                             {/* Import CSS của admin */}
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/css/components.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                         </Helmet>
//                         <AdminLayout>
//                             {/* Thêm các component admin ở đây */}
//                             <Sidebar/>
//
//                         </AdminLayout>
//                     </>
//                 }/>
//
//
//                 <Route path="/admin/service" element={
//                     <>
//                         <Helmet>
//                             {/* Import CSS của admin */}
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/css/components.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                         </Helmet>
//                         <AdminLayout>
//                             {/* Thêm các component admin ở đây */}
//                             <TableService />
//
//                             <Sidebar/>
//                         </AdminLayout>
//                     </>
//                 }/>
//                 <Route path="/admin/feedback/:date" element={
//                     <>
//                         <Helmet>
//                             {/* Import CSS của admin */}
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/css/components.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                         </Helmet>
//                         <AdminLayout>
//                             {/* Thêm các component admin ở đây */}
//                             <FeedbackList/>
//                             <Sidebar/>
//                         </AdminLayout>
//                     </>
//                 }/>
//                 <Route path="/admin/feedback" element={
//                     <>
//                         <Helmet>
//                             {/* Import CSS của admin */}
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/css/components.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                         </Helmet>
//                         <AdminLayout>
//                             {/* Thêm các component admin ở đây */}
//                             <FeedbackList/>
//                             <Sidebar/>
//                         </AdminLayout>
//                     </>
//                 }/>
//                 <Route path="/admin/sell" element={
//                     <>
//                         <Helmet>
//                             {/* Import CSS của admin */}
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
//                             <link rel="stylesheet"
//                                   href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
//                             <link rel="stylesheet"
//                                   href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/css/components.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                             <link rel="stylesheet" href="/assets/css/admin.css"/>
//                         </Helmet>
//                         <AdminLayout>
//                             {/* Thêm các component admin ở đây */}
//                             <Sell/>
//                             <Sidebar/>
//                         </AdminLayout>
//                     </>
//                 }/>
//                 <Route path="/admin/order" element={
//                     <>
//                         <Helmet>
//                             {/* Import CSS của admin */}
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
//                             <link rel="stylesheet"
//                                   href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
//                             <link rel="stylesheet"
//                                   href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/css/components.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                             <link rel="stylesheet" href="/assets/css/admin.css"/>
//                         </Helmet>
//                         <AdminLayout>
//                             {/* Thêm các component admin ở đây */}
//                             <OrderList/>
//                             <Sidebar/>
//                         </AdminLayout>
//                     </>
//                 }/>
//                 <Route path="/admin/news" element={
//                     <>
//                         <Helmet>
//                             {/* Import CSS của admin */}
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>
//
//                             <link rel="stylesheet" href="/assets/css/components.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                         </Helmet>
//                         <AdminLayout>
//                             {/* Thêm các component admin ở đây */}
//                             <NewsForm />
//                             <Sidebar/>
//                         </AdminLayout>
//                     </>
//                 }/>
//
//                 {/* Thêm route cho Admin Login */}
//                 <Route path="/admin/login" element={
//                     <>
//                         <Helmet>
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                         </Helmet>
//                         <LoginForm/>
//                     </>
//                 }/>
//
//                 {/* Employee Details Route */}
//                 <Route path="/admin/employee/:employeeId" element={
//                     <>
//                         <Helmet>
//                             {/* Import admin CSS */}
//                             <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css"/>
//                             <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css"/>
//                             <link rel="stylesheet" href="/assets/css/components.css"/>
//                             <link rel="stylesheet" href="/assets/css/style.css"/>
//                         </Helmet>
//                         <AdminLayout>
//                             <EmployeeDetailService/>
//                             <Sidebar/>
//                         </AdminLayout>
//                     </>
//                 }/>
//             </Routes>
//         </BrowserRouter>
//         <ToastContainer/>
//         </>
//     );
// }
//
// export default App;



import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
// Client Components
import Slider from "./components/client/common/Slider";
import MainComponent from "./components/client/MainComponent";
import TopNewestServices from "./components/client/home/TopNewestServices";
import ClientLayout from "./components/client/ClientLayout";
import TopMostOrderServices from "./components/client/home/TopMostOrderServices";
import Menu from "./components/client/Menu";
import NewsList from "./components/client/news/NewsList";
import NewsDetail from "./components/client/news/NewsDetail";
import CounterSection from "./components/client/home/CounterSection";
// import RegisterForm from "./components/client/RegisterForm";
import RegisterForm from "./components/admin/register/RegisterForm";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import Sidebar from "./components/admin/common/Sidebar";
import TableService from "./components/admin/manager/TableService";
import FeedbackList from "./components/admin/feedbackList";
import Sell from "./components/admin/Sell";
import LoginForm from "./components/admin/Login/LoginForm";
import OrderList from "./components/admin/manager/OrderList";
import NewsForm from "./components/admin/news/NewsForm";
 import EmployeeProfile from "./components/admin/register/EmployeeProfile";
import UpdateEmployee from "./components/admin/register/UpdateEmployee";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Các route cho Client */}
                    <Route path="/" element={
                        <>
                            <Helmet>
                                {/* Import CSS của client */}
                                <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
                                <link rel="stylesheet" href="/css/animate.css" />
                                <link rel="stylesheet" href="/css/magnific-popup.css" />
                                <link rel="stylesheet" href="/css/aos.css" />
                                <link rel="stylesheet" href="/css/ionicons.min.css" />
                                <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
                                <link rel="stylesheet" href="/css/jquery.timepicker.css" />
                                <link rel="stylesheet" href="/css/flaticon.css" />
                                <link rel="stylesheet" href="/css/icomoon.css" />
                                <link rel="stylesheet" href="/css/style.css" />
                            </Helmet>
                            <ClientLayout>
                                <Slider />
                                <MainComponent />
                                <TopNewestServices />
                                <CounterSection />
                                <TopMostOrderServices />
                            </ClientLayout>
                        </>
                    } />
                    <Route path="/menu" element={
                        <>
                            <Helmet>
                                <link rel="stylesheet" href="/css/icomoon.css" />
                                <link rel="stylesheet" href="/css/style.css" />
                            </Helmet>
                            <ClientLayout>
                                <Slider />
                                <Menu />
                            </ClientLayout>
                        </>
                    } />
                    <Route path="/news" element={
                        <>
                            <Helmet>
                                <link rel="stylesheet" href="/css/icomoon.css" />
                                <link rel="stylesheet" href="/css/style.css" />
                            </Helmet>
                            <ClientLayout>
                                <Slider />
                                <NewsList />
                            </ClientLayout>
                        </>
                    } />
                    <Route path="/news/:newsId" element={
                        <>
                            <Helmet>
                                <link rel="stylesheet" href="/css/icomoon.css" />
                                <link rel="stylesheet" href="/css/style.css" />
                            </Helmet>
                            <ClientLayout>
                                <Slider />
                                <NewsDetail />
                            </ClientLayout>
                        </>
                    } />

                    {/* Route cho Admin */}
                    <Route path="/admin" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/admin/service" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <TableService />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/admin/feedback/:date" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <FeedbackList />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/admin/feedback" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <FeedbackList />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/admin/sell" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                                <link rel="stylesheet" href="/assets/css/admin.css" /> {/* Đoạn thêm mới cho CSS của trang bán hàng */}
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <Sell />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/admin/order" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <OrderList />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/admin/news/add" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <NewsForm />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="profile/:employeeId" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <EmployeeProfile /> {/* <-- Added component for employee profile */}
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/update/:employeeId" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                 <UpdateEmployee />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/admin/login" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <LoginForm />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                    <Route path="/admin/register" element={
                        <>
                            <Helmet>
                                {/* Import CSS của admin */}
                                <link rel="stylesheet" href="/assets/modules/bootstrap/css/bootstrap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/fontawesome/css/all.min.css" />
                                <link rel="stylesheet" href="/assets/modules/jqvmap/dist/jqvmap.min.css" />
                                <link rel="stylesheet" href="/assets/modules/summernote/summernote-bs4.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.carousel.min.css" />
                                <link rel="stylesheet" href="/assets/modules/owlcarousel2/dist/assets/owl.theme.default.min.css" />
                                <link rel="stylesheet" href="/assets/css/components.css" />
                                <link rel="stylesheet" href="/assets/css/style.css" />
                            </Helmet>
                            <AdminLayout>
                                {/* Thêm các component admin ở đây */}
                                <RegisterForm />
                                <Sidebar />
                            </AdminLayout>
                        </>
                    } />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </>
    );
}

export default App;

