"use client";
import React, { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";
import Select from "react-select";
import axios from "@/lib/axios";

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBlank, setIsBlank] = useState(false);
    const router = useRouter();
    const [date, setDate] = useState('');
    const [ExpID, setExpID] = useState('');
    const [availableExpAcc, setAvailableExpAcc] = useState([]);
    const [Amount, setAmount] = useState(0);
    const [ExpReff, setExpReff] = useState('');

    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ExpAccAdd = `${apiAdd}/ExpAccount`;
    const ExpAdd = `${apiAdd}/AddExp`;

    // Fetch available products when the component mounts
    useEffect(() => {
        // Adjust the API endpoint based on your Laravel backend
        axios.get(ExpAccAdd)
            .then((response) => setAvailableExpAcc(response.data))
            .catch((error) => console.error('Error fetching Customer:', error));
    }, [ExpAccAdd]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasEmptyFields = date === '' ||
            ExpID === ''||
            Amount === 0;
        if (hasEmptyFields) {
            setIsBlank(true);
            return;
        }
        if (isSubmitting) {
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post(ExpAdd, {
                Date: date,
                ExpID,
                Ref: ExpReff,
                Amount,
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Purchase successfully added');
                // Redirect or handle success as needed
                router.push('/');
            } else {
                console.error('Failed to add purchase');
                // Handle failure, show error message, etc.
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message, etc.
        }
    };
    const ExpOption =availableExpAcc.map((ExpAcc) => ({
        value: ExpAcc.ExpID,
        label:ExpAcc.ExpName,
    }));

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Expenses</h1>
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
                                    <h3 className="card-title">Expense</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {/* Add form fields for date, vendorID */}
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label>Date:</label>
                                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                                {date === '' && isBlank && <p className="text-danger">Date cannot be empty</p>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label>Expense Account:</label>
                                                <Select
                                                    options={ExpOption}
                                                    value={ExpOption.find((option) => option.value === ExpID)}
                                                    onChange={(selectedOption) => (setExpID(selectedOption.value))}
                                                />
                                                {ExpID === '' && isBlank && <p className="text-danger">Account cannot be empty</p>}
                                            </div><div className="form-group col-md-4"></div><div className="form-group col-md-4"></div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="form-group col-md-4">
                                                <label>Amount:</label>
                                                <input
                                                    type="text" className="form-control"
                                                    value={Amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                                {Amount === 0 && isBlank && <p className="text-danger">Amount cannot be 0</p>}
                                            </div>
                                            <div className="form-group col-md-4"></div>
                                            <div className="form-group col-md-4"></div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="form-group col-md-4">
                                                <label>Note:</label>
                                                <textarea
                                                    className="form-control"
                                                    value={ExpReff}
                                                    onChange={(e) => setExpReff(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-md-4"></div>
                                            <div className="form-group col-md-4"></div>
                                        </div>

                                        <div className="row form-group">
                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4">
                                                <button type="submit" disabled={isSubmitting} className="btn btn-success"> {isSubmitting? "Processing..." : "Submit"} </button>
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

export default Page;
