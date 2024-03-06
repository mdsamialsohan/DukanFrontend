"use client";
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import axios from "@/lib/axios";

function Page(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [ProductUnit, setProUnit] = useState('');
    const [Unit2KG, setUnit2KG] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/AddProductUnit`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        try {
            setIsSubmitting(true);
            const response = await axios.post(ApiUrl, {
                UnitName:ProductUnit,
                Unit2KG
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Product Brand successfully added');
                router.push('/')
                // Handle success (e.g., redirect, show a success message)
            } else {
                console.error('Failed to add Product Brand');
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
                            <h1 className="m-0">Product</h1>
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
                                    <h3 className="card-title">New Unit</h3>
                                </div>
                                <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <label>Unit Name:</label>
                                    <input type="text" className="form-control" value={ProductUnit} onChange={(e) => setProUnit(e.target.value)} />
                                    <label>KG:</label>
                                    <input type="text" className="form-control" value={Unit2KG} onChange={(e) => setUnit2KG(e.target.value)} />
                                    <br/>
                                    <button type="submit" disabled={isSubmitting} className="btn btn-block btn-success"> {isSubmitting? "Adding..." : "Add Unit"} </button>
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