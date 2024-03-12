"use client";
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import { useEffect } from 'react';
import Select from 'react-select';
import axios from "@/lib/axios";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

function Page(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [ProCatID, setProCatID] = useState('');
    const [ProBrandID, setProBrandID] = useState('');
    const [ProUnitID, setProUnitID] = useState('');
    const [PurchaseRate, setPurchaseRate] = useState(0);
    const [NumOfUnit, setNumOfUnit] = useState(0);
    const [PurchaseExp, setPurchaseExp] = useState(0);

    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/AddProduct`;

    const UnitUrl = `${apiAdd}/ProductUnit`;

    const BrandUrl = `${apiAdd}/ProductBrand`;

    const CatUrl = `${apiAdd}/ProductCat`;


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        try {
            setIsSubmitting(true);
            const response = await axios.post(ApiUrl, {
                BrandID:ProBrandID,
                ProductCatID: ProCatID,
                UnitID: ProUnitID,
                Rate: PurchaseRate,
                ProductUnit: NumOfUnit,
                ExpPerUnit: PurchaseExp,
            }, {
                timeout: 5000, // Set a timeout of 5 seconds (adjust as needed)
            });


            if (response.status === 200)  {
                console.log('Product Brand successfully added');
                router.push('/');
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
    const { data: catData, error: catError } = useSWR(`${apiAdd}/ProductCat`, fetcher);
    const { data: unitData, error: unitError } = useSWR(`${apiAdd}/ProductUnit`, fetcher);
    const { data: brandData, error: brandError } = useSWR(`${apiAdd}/ProductBrand`, fetcher);

    useEffect(() => {
        if (catError) {
            console.error('Error fetching Product Category:', catError);
        }
    }, [catError]);

    useEffect(() => {
        if (unitError) {
            console.error('Error fetching Product Unit:', unitError);
        }
    }, [unitError]);

    useEffect(() => {
        if (brandError) {
            console.error('Error fetching Product Brands:', brandError);
        }
    }, [brandError]);

    const optionBrand = brandData?.map((product) => ({
        value: product.BrandID,
        label: product.BrandName,
    })) || [];

    const optionCat = catData?.map((category) => ({
        value: category.ProductCatID,
        label: category.ProductCat,
    })) || [];

    const optionUnit = unitData?.map((unit) => ({
        value: unit.UnitID,
        label: unit.UnitName,
    })) || [];

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
                                    <h3 className="card-title">New Product</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Brand Name</label>
                                        <Select
                                            options={optionBrand}
                                            value={optionBrand.find((option) => option.value === ProBrandID)}
                                            onChange={(selectedOption) => setProBrandID(selectedOption.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Product Category</label>
                                        <Select
                                            options={optionCat}
                                            value={optionCat.find((option) => option.value === ProCatID)}
                                            onChange={(selectedOption) => setProCatID(selectedOption.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Product unit</label>
                                        <Select
                                            options={optionUnit}
                                            value={optionUnit.find((option) => option.value === ProUnitID)}
                                            onChange={(selectedOption) => setProUnitID(selectedOption.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label>Purchase Rate</label>
                                        <input type="text" className="form-control" value={PurchaseRate} onChange={(e) => setPurchaseRate(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Number Of Unit</label>
                                        <input type="text" className="form-control" value={NumOfUnit} onChange={(e) => setNumOfUnit(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Expense per unit</label>
                                        <input type="text" className="form-control" value={PurchaseExp} onChange={(e) => setPurchaseExp(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-4">
                                             <button type="submit" disabled={isSubmitting} className="btn btn-success"> {isSubmitting? "Adding..." : "Add Brand"} </button>
                                        </div>
                                        <div className="col-sm-4">

                                        </div>
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