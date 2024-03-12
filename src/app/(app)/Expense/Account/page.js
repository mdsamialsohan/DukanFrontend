"use client";
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import axios from '@/lib/axios';

function Page(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [ExpenseName, setExpenseName] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/AddExpAccount`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        try {
            setIsSubmitting(true);
            const response = await axios.post(ApiUrl, {
                ExpName: ExpenseName,
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Expense successfully added');
                router.push('/')
                // Handle success (e.g., redirect, show a success message)
            } else {
                console.error('Failed to add Expense');
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
                            <h1 className="m-0">Expense</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">New Expense</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row form-group">
                                            <div className="form-group col-md-4">
                                                <label>Expense Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={ExpenseName}
                                                    onChange={(e) => setExpenseName(e.target.value)}
                                                />
                                            </div><div className="form-group col-md-4"></div>
                                            <div className="form-group col-md-4"></div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-sm-1"></div>
                                            <div className="col-sm-4">
                                                <button type="submit" disabled={isSubmitting} className="btn btn-success"> {isSubmitting? "Adding..." : "Add Expense Name"} </button>
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
}

export default Page;