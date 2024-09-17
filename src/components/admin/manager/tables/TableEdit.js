import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTableById, updateTable } from '../../service/tableService';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define validation schema with Yup
const validationSchema = Yup.object({
    code: Yup.string()
        .matches(/^TB\d+$/, 'Code must start with "TB" followed by numbers') // Regular expression to check format
        .required('Code is required'),
    state: Yup.string()
        .required('State is required'),
    on: Yup.boolean(),
    delete: Yup.boolean() // Add validation for delete field
});

const TableEdit = () => {
    const { tableId } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const data = await getTableById(tableId);
                setInitialValues({
                    code: data.code,
                    state: data.state,
                    on: data.on,
                    delete: data.delete // Set delete value when loading data
                });
            } catch (error) {
                console.error('Error fetching table information:', error);
                toast.error('Error fetching table information.');
            }
        };

        fetchTable();
    }, [tableId]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateTable(tableId, values);
            toast.success('Table updated successfully!');
            navigate('/admin/tables/list'); // Navigate to the table list page
        } catch (error) {
            console.error('Error updating table:', error);
            toast.error('Failed to update table.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!initialValues) return <p>Loading...</p>;

    return (
        <div className="main-content">
            <div className="section-body">
                <h2 className="section-title">Edit Table</h2>
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="code">Code</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="code"
                                        name="code"
                                    />
                                    <ErrorMessage name="code" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        name="state"
                                    />
                                    <ErrorMessage name="state" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="on">Status</label>
                                    <Field as="select" className="form-control" id="on" name="on">
                                        <option value={true}>ON</option>
                                        <option value={false}>OFF</option>
                                    </Field>
                                    <ErrorMessage name="on" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="delete">Is Deleted</label>
                                    <Field as="select" className="form-control" id="delete" name="delete">
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </Field>
                                    <ErrorMessage name="delete" component="div" className="text-danger" />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default TableEdit;
