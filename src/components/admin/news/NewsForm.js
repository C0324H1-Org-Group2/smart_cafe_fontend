import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as newsService from '../services/NewsService';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const NewsForm = () => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Tiêu đề là bắt buộc'),
        content: Yup.string()
            .required('Nội dung là bắt buộc'),
        file: Yup.mixed()
            .required('Ảnh là bắt buộc')
    });

    const saveNews = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('file', values.file);
        const userId = localStorage.getItem("userId");
        formData.append('userId', userId);

        try {
            const response = await newsService.createNews(formData);
            if (response) {
                toast.success('Tin tức được tạo thành công!');
                navigate('/admin');
            }
        } catch (error) {
            toast.error('Tạo tin tức thất bại');
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
                            <h2>Tạo Tin Tức Mới</h2>
                            <Formik
                                initialValues={{
                                    title: '',
                                    content: '',
                                    file: null
                                }}
                                onSubmit={saveNews}
                                validationSchema={validationSchema}
                            >
                                {({ setFieldValue }) => (
                                    <Form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="title">Tiêu Đề:</label>
                                            <Field name="title" type="text" className="form-control" />
                                            <ErrorMessage name="title" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="content">Nội Dung:</label>
                                            <Field name="content" as="textarea" rows="3" className="form-control"/>
                                            <ErrorMessage name="content" component="p" className="text-danger" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="file">Ảnh:</label>
                                            <input
                                                name="file"
                                                type="file"
                                                className="form-control"
                                                onChange={(event) => {
                                                    setFieldValue('file', event.currentTarget.files[0]);
                                                    setPreviewImage(URL.createObjectURL(event.currentTarget.files[0]));
                                                }}
                                            />
                                            <ErrorMessage name="file" component="p" className="text-danger" />
                                        </div>
                                        {previewImage && (
                                            <div className="mb-3">
                                                <img src={previewImage} alt="Preview" className="img-fluid" style={{ width: '150px', height: '150px', objectFit: 'cover' }}/>
                                            </div>
                                        )}
                                        <div className="d-flex justify-content-between">
                                            <button type="submit" className="btn btn-primary">Tạo Tin</button>
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

export default NewsForm;
