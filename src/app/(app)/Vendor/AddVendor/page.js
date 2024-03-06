"use client";
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import axios from "@/lib/axios";

function Page(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [debt, setDebt] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/NewVendor`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        try {
            setIsSubmitting(true);

            const response = await axios.post(ApiUrl, {
                VendorName:name,
                VendorMobile:mobile,
                VendorAddress:address,
                Debt:debt,
            });

            if (response.status === 200) {
                console.log('Vendor added successfully');
                router.push('/')
                // Handle success (e.g., redirect, show a success message)
            } else {
                console.error('Failed to add Vendor');
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
                                    <h3 className="card-title">New Vendor</h3>
                                </div>
                                <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <label>Name:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />

                                    <label>Mobile:</label>
                                    <input type="text" className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} />

                                    <label>Address:</label>
                                    <textarea className="form-control form-control-lg" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

                                    <label>Due:</label>
                                    <input type="text" className="form-control" value={debt} onChange={(e) => setDebt(e.target.value)} />
                                   <br/>
                                    <button type="submit" disabled={isSubmitting} className="btn btn-block btn-success"> {isSubmitting? "Adding..." : "Add Vendor"} </button>
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