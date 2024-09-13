import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as serviceService from '../../service/ServiceService';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Button, Container, Form as BootstrapForm } from 'react-bootstrap';

const CreateServiceForm = () => {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [serviceTypes, setServiceTypes] = useState([]);

    useEffect(() => {
        const fetchServiceTypes = async () => {
            try {
                const response = await serviceService.getServiceTypes();
                setServiceTypes(response);
            } catch (error) {
                toast.error('Không thể tải loại món');
            }
        };

        fetchServiceTypes();
    }, []);

    const validationSchema = Yup.object({
        serviceCode: Yup.string().required('Mã món là bắt buộc'),
        serviceName: Yup.string().required('Tên món là bắt buộc'),
        typeId: Yup.number().required('Loại món là bắt buộc'),
        price: Yup.number().required('Giá là bắt buộc'),
        description: Yup.string().required('Mô tả là bắt buộc'),
        imageUrl: Yup.mixed().required('Ảnh là bắt buộc'),
        waitTime: Yup.number().required('Thời gian chờ là bắt buộc')
            .min(0, 'Thời gian chờ không được âm'),
        status: Yup.string().required('Trạng thái là bắt buộc')
    });

    const saveService = async (values) => {
        try {
            const minutes = values.waitTime;
            const hours = Math.floor(minutes / 60);
            const minutesPart = minutes % 60;
            const localTime = `${String(hours).padStart(2, '0')}:${String(minutesPart).padStart(2, '0')}:00`;

            const formData = new FormData();
            formData.append('serviceCode', values.serviceCode);
            formData.append('serviceName', values.serviceName);
            formData.append('typeId', values.typeId);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('imageUrl', values.imageUrl);
            formData.append('waitTime', localTime);
            formData.append('status', values.status);

            const response = await serviceService.addService(formData);
            if (response) {
                toast.success('Món được tạo thành công!');
                navigate('/admin/service');
            } else {
                toast.error('Tạo món thất bại');
            }
        } catch (error) {
            toast.error('Tạo món thất bại');
            console.error('Error saving service:', error);
        }
    };

    const handleCancel = () => {
        navigate('/admin/service');
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setFieldValue('imageUrl', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="main-content">
            <div className="section-body">
                <Container className="mt-4">
                    <h2>Tạo Món Mới</h2>
                    <Formik
                        initialValues={{
                            serviceCode: '',
                            serviceName: '',
                            typeId: 0,
                            price: '',
                            description: '',
                            imageUrl: null,
                            waitTime: '',
                            status: 'available'
                        }}
                        onSubmit={saveService}
                        validationSchema={validationSchema}
                    >
                        {({ setFieldValue }) => (
                            <Form encType="multipart/form-data">
                                <BootstrapForm.Group className="mb-3" controlId="serviceCode">
                                    <BootstrapForm.Label>Mã Món:</BootstrapForm.Label>
                                    <Field name="serviceCode" type="text" className="form-control" />
                                    <ErrorMessage name="serviceCode" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="serviceName">
                                    <BootstrapForm.Label>Tên Món:</BootstrapForm.Label>
                                    <Field name="serviceName" type="text" className="form-control" />
                                    <ErrorMessage name="serviceName" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="typeId">
                                    <BootstrapForm.Label>Loại Món:</BootstrapForm.Label>
                                    <Field as="select" name="typeId" className="form-control">
                                        <option value="">Chọn loại món</option>
                                        {serviceTypes.map(type => (
                                            <option key={type.typeId} value={type.typeId}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="typeId" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="price">
                                    <BootstrapForm.Label>Giá:</BootstrapForm.Label>
                                    <Field name="price" type="number" className="form-control" />
                                    <ErrorMessage name="price" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="description">
                                    <BootstrapForm.Label>Mô Tả:</BootstrapForm.Label>
                                    <Field name="description" as="textarea" className="form-control" />
                                    <ErrorMessage name="description" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="imageUrl">
                                    <BootstrapForm.Label>Ảnh:</BootstrapForm.Label>
                                    <input
                                        name="imageUrl"
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => handleImageChange(event, setFieldValue)}
                                    />
                                    <ErrorMessage name="imageUrl" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                {previewImage && (
                                    <div className="mb-3">
                                        <img src={previewImage} alt="Preview" className="img-fluid" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                    </div>
                                )}

                                <BootstrapForm.Group className="mb-3" controlId="waitTime">
                                    <BootstrapForm.Label>Thời Gian Chờ (phút):</BootstrapForm.Label>
                                    <Field name="waitTime" type="number" className="form-control" min="0" />
                                    <ErrorMessage name="waitTime" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group className="mb-3" controlId="status">
                                    <BootstrapForm.Label>Trạng Thái:</BootstrapForm.Label>
                                    <Field as="select" name="status" className="form-control">
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        <option value="out_of_stock">Out of Stock</option>
                                    </Field>
                                    <ErrorMessage name="status" component="p" className="text-danger" />
                                </BootstrapForm.Group>

                                <div className="d-flex justify-content-between">
                                    <Button type="submit" variant="primary">Tạo Món</Button>
                                    <Button type="button" variant="secondary" onClick={handleCancel}>Hủy</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        </div>
    );
};

export default CreateServiceForm;
