"use client";
import React, { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";
import Select from "react-select";
import axios from "@/lib/axios";

const CreatePurchase = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBlank, setIsBlank] = useState(false);
    const router = useRouter();
    const [date, setDate] = useState('');
    const [vendorID, setVendorID] = useState('');
    const [availableVendor, setAvailableVendor] = useState([]);
    const [Debt, setDebt] = useState(0);
    const [Pay, setPay] = useState(0);

    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const VendorAdd = `${apiAdd}/VendorList`;
    const PurchaseAdd = `${apiAdd}/DebtPay`;

    // Fetch available products when the component mounts
    useEffect(() => {
        // Adjust the API endpoint based on your Laravel backend
        axios.get(VendorAdd)
            .then((response) => setAvailableVendor(response.data))
            .catch((error) => console.error('Error fetching Vendor:', error));
    }, [VendorAdd]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasEmptyFields = date === '' ||
            vendorID === ''||
            Pay === 0;
        if (hasEmptyFields) {
            setIsBlank(true);
            return;
        }
        if (isSubmitting) {
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post(PurchaseAdd, {
                Date: date,
                VendorID: vendorID,
                Pay,
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
    const VendorOption =availableVendor.map((vendor) => ({
        value: vendor.VendorID,
        label: vendor.VendorName,
        debt: parseInt(vendor.Debt),
    }));

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Vendor</h1>
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
                                    <h3 className="card-title">Debt Pay</h3>
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
                                            <label>Vendor ID:</label>
                                            <Select
                                                options={VendorOption}
                                                value={VendorOption.find((option) => option.value === vendorID)}
                                                onChange={(selectedOption) => (setVendorID(selectedOption.value), setDebt(selectedOption.debt))}
                                            />
                                            {vendorID === '' && isBlank && <p className="text-danger">Date cannot be empty</p>}
                                        </div><div className="form-group col-md-4"></div><div className="form-group col-md-4"></div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="form-group col-md-4"></div>
                                        <div className="form-group col-md-3"></div>
                                        <div className="form-group col-md-2">
                                            <label>Debt:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={Debt}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="form-group col-md-4"></div>
                                        <div className="form-group col-md-3"></div>
                                        <div className="form-group col-md-2">
                                            <label>Payment:</label>
                                            <input
                                                type="text" className="form-control"
                                                value={Pay}
                                                onChange={(e) => setPay(e.target.value)}
                                            />
                                            {Pay === 0 && isBlank && <p className="text-danger">Payment cannot be 0</p>}
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="form-group col-md-4"></div>
                                        <div className="form-group col-md-3"></div>
                                        <div className="form-group col-md-2">
                                            <label>Final Debt:</label>
                                            <input
                                                type="text" className="form-control"
                                                value={Debt-Pay} disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-4">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-success"> {isSubmitting? "Processing..." : "Purchasing"} </button>
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

export default CreatePurchase;
