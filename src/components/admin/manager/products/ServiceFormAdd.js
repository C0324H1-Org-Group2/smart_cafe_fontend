import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import * as serviceService from "../../service/ServiceService";

const ServiceFormAdd = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        serviceCode: Yup.string()
            .required('Mã dịch vụ là bắt buộc'),
        serviceName: Yup.string()
            .required('Tên dịch vụ là bắt buộc'),
        typeId: Yup.number()
            .required('Loại dịch vụ là bắt buộc'),
        price: Yup.number()
            .required('Giá là bắt buộc'),
        description: Yup.string()
            .required('Mô tả là bắt buộc'),
        imageUrl: Yup.string()
            .required('URL ảnh là bắt buộc'),
        waitTime: Yup.string()
            .required('Thời gian chờ là bắt buộc'),
        status: Yup.string()
            .required('Trạng thái là bắt buộc'),
        delete: Yup.boolean()
    });

    const saveService = async (values) => {
        try {
            const response = await serviceService.createService(values);
            if (response) {
                toast.success('Dịch vụ được tạo thành công!');
                navigate('/admin/services');
            }
        } catch (error) {
            toast.error('Tạo dịch vụ thất bại');
        }
    };

    const handleCancel = () => {
        navigate('/admin');
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h2>Tạo Dịch Vụ Mới</h2>
                            <Formik
                                initialValues={{
                                    serviceCode: '',
                                    serviceName: '',
                                    typeId: '',
                                    price: '',
                                    description: '',
                                    imageUrl: '',
                                    waitTime: '',
                                    status: '',
                                    delete: false
                                }}
                                onSubmit={saveService}
                                validationSchema={validationSchema}
                            >
                                {({ setFieldValue }) => (
                                    <Form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="serviceCode">Mã Dịch Vụ:</label>
                                            <Field name="serviceCode" type="text" className="form-control" />
                                            <ErrorMessage name="serviceCode" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="serviceName">Tên Dịch Vụ:</label>
                                            <Field name="serviceName" type="text" className="form-control" />
                                            <ErrorMessage name="serviceName" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="typeId">Loại Dịch Vụ:</label>
                                            <Field name="typeId" type="number" className="form-control"/>
                                            <ErrorMessage name="typeId" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="price">Giá:</label>
                                            <Field name="price" type="number" className="form-control"/>
                                            <ErrorMessage name="price" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="description">Mô Tả:</label>
                                            <Field name="description" type="text" className="form-control"/>
                                            <ErrorMessage name="description" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="imageUrl">URL Ảnh:</label>
                                            <Field name="imageUrl" type="text" className="form-control"/>
                                            <ErrorMessage name="imageUrl" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="waitTime">Thời Gian Chờ:</label>
                                            <Field name="waitTime" type="text" className="form-control"/>
                                            <ErrorMessage name="waitTime" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="status">Trạng Thái:</label>
                                            <Field name="status" type="text" className="form-control"/>
                                            <ErrorMessage name="status" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="delete">Xóa:</label>
                                            <Field name="delete" type="checkbox" className="form-control"/>
                                            <ErrorMessage name="delete" component="p" className="text-danger" />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <button type="submit" className="btn btn-primary">Tạo Dịch Vụ</button>
                                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Hủy</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default ServiceFormAdd;