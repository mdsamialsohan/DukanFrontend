'use client';
import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import {useParams, useRouter} from "next/navigation";

const UpdateCustomer = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const params = useParams();
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [due, setDue] = useState('');
    const [national_id, setNationalId] = useState('');

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`${apiAdd}/customer/${params.id}`);
                const customerData = response.data.customer; // Assuming response contains a 'customer' property
                setName(customerData.name);
                setMobile(customerData.mobile);
                setAddress(customerData.address);
                setDue(customerData.due);
                setNationalId(customerData.national_id);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };

        if (params.id) {
            fetchCustomer();
        }
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        try {
            setIsSubmitting(true);
            const response = await axios.put(`${apiAdd}/UpdateCustomer/${params.id}`, {
                name,
                mobile,
                address,
                due,
                national_id,
            });

            if (response.status === 200) {
                console.log('Customer updated successfully');
                router.push('/')
                // Handle success (e.g., redirect, show a success message)
            } else {
                console.error('Failed to add Account');
                // Handle failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Customer</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Add Customer</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row form-group">
                                            <div className="form-group col-md-4">
                                            <label>Name:</label>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-4"></div>
                                            <div className="form-group col-md-4"></div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="form-group col-md-4">
                                                <label>Mobile:</label>
                                                <input type="text" className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} />

                                            </div>
                                            <div className="form-group col-md-4"></div>
                                            <div className="form-group col-md-4"></div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="form-group col-md-4">
                                                <label>Address:</label>
                                                <textarea className="form-control form-control-lg" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

                                            </div>
                                            <div className="form-group col-md-4"></div>
                                            <div className="form-group col-md-4"></div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="form-group col-md-4">
                                                <label>Due:</label>
                                                <textarea className="form-control form-control-lg" value={due} onChange={(e) => setDue(e.target.value)}></textarea>

                                            </div>
                                            <div className="form-group col-md-4"></div>
                                            <div className="form-group col-md-4"></div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <button type="submit" disabled={isSubmitting} className="btn btn-success"> {isSubmitting? "Updating..." : "Update Customer"} </button>
                                            </div>
                                            <div className="col-sm-4"></div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        );
        };

        export default UpdateCustomer;