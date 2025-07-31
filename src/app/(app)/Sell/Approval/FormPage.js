"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import axios from '@/lib/axios';
import Select from 'react-select';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const ApprovePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const MemoID = searchParams.get("MemoId");
    const [Due, setDue] = useState(0);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const { data: availableProducts } = useSWR(`${apiAdd}/Product`, fetcher);
    const [memo, setMemo] = useState(null);
    const [formData, setFormData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const BrandAdd = `${apiAdd}/ProductBrand`;
    const CatAdd = `${apiAdd}/ProductCat`;
    const UnitAdd = `${apiAdd}/ProductUnit`;
    const CustomerAdd = `${apiAdd}/customers`;


    const { data: availableBrands } = useSWR(BrandAdd,fetcher);
    const { data: availableCat } = useSWR(CatAdd,fetcher);
    const { data: availableUnit } = useSWR(UnitAdd,fetcher);
    const { data: availableCustomer } = useSWR(CustomerAdd,fetcher);

    const customerOptions = availableCustomer?.map((customer) => ({
        value: customer.c_id,
        label:`${customer.name} - ${customer.address}`,
        Due: parseInt(customer.due),
    })) || [];
    // Load memo
    useEffect(() => {
        if (!MemoID) return;
        axios.get(`${apiAdd}/sellMemoDetails/${MemoID}`).then(res => {
            const memoData = res.data.sellMemo;
            setMemo(memoData);
            console.log(memoData);
            setFormData({
                customerID: memoData.c_id,
                originalCustomerID: memoData.c_id,
                date: memoData.Date,
                name: memoData.customer?.name,
                address: memoData.customer?.address,
                totalBill: memoData.TotalBill,
                paid: memoData.Paid,
                due: memoData.Due,
                sell_dtls: memoData.sell_dtls.map(item => ({
                    SellDtID: item.SellDtID,
                    productID: item.ProductID,
                    originalProductID: item.ProductID,
                    quantity: item.Quantity,
                    rate: item.Rate,
                    subTotal: item.SubTotal
                }))
            });
        });
    }, [MemoID]);

    useEffect(() => {
        if (!formData?.customerID || !customerOptions.length) return;

        const selectedCustomer = customerOptions.find(opt => opt.value === formData.customerID);
        if (selectedCustomer) {
            setFormData(prev => ({
                ...prev,
                prevDue: selectedCustomer.Due,
            }));
        }
    }, [formData?.customerID, customerOptions]);
    // Update calculations on input change
    useEffect(() => {
        if (!formData) return;
        const total = formData.sell_dtls.reduce((sum, item) => {
            return sum + parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
        }, 0);
        const due = total + parseFloat(formData.prevDue || 0) - parseFloat(formData.paid || 0);
        setFormData(prev => ({
            ...prev,
            totalBill: total,
            due
        }));
    }, [formData?.sell_dtls, formData?.paid, formData?.prevDue]);

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleProductChange = (index, field, value) => {
        const updated = [...formData.sell_dtls];
        updated[index][field] = value;
        setFormData(prev => ({
            ...prev,
            sell_dtls: updated
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log(formData);
        try {
            const payload = {
                ...formData,
                isApproved: 1,
                sell_dtls: formData.sell_dtls.map(item => ({
                    SellDtID: item.SellDtID,
                    product_id: item.productID,
                    Quantity: item.quantity,
                    Rate: item.rate,
                    SubTotal: item.subTotal
                }))
            };

            await axios.post(`${apiAdd}/approveMemo/${MemoID}`, payload);
            alert("Memo Approved!");
            router.push("/");
        } catch (err) {
            console.error(err);
            alert("Failed to approve memo.");
        } finally {
            setIsSubmitting(false);
        }
    };


    // Fetching data for product options
    const productOptions = availableProducts?.map((availableProduct) => {
        const brandName = availableBrands?.find((Brand) => Brand.BrandID === availableProduct.BrandID)?.BrandName || '';
        const productCat = availableCat?.find((Cat) => Cat.ProductCatID === availableProduct.ProductCatID)?.ProductCat || '';
        const unitName = availableUnit?.find((Unit) => Unit.UnitID === availableProduct.UnitID)?.UnitName || '';

        return {
            value: availableProduct.ProductID,
            label: `${brandName} (${productCat}) - ${unitName} (${availableProduct.ProductUnit})`,
            stock: availableProduct.ProductUnit,
        };
    }) || [];



    if (!formData) return <div className="p-5">Loading memo data...</div>;

    return (
            <section className="content">
                <div className="container-fluid">
                    <h3 className="mb-3">Approve Sell Memo</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-2">
                            <div className="col-md-4">
                                <label>Date:</label>
                                <input className="form-control" type="date" value={formData.date} onChange={(e) => handleFieldChange("date", e.target.value)} />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4">
                                <label>Customer:</label>
                                <Select
                                    options={customerOptions}
                                    value={customerOptions.find(
                                        (opt) => opt.value === formData.customerID
                                    )}
                                    onChange={(selected) => {
                                        handleFieldChange("customerID", selected.value);
                                    }}
                                    formatOptionLabel={(option) => {
                                        const isOriginal = option.value === formData.originalCustomerID;
                                        return (
                                            <div
                                                style={{
                                                    color: isOriginal ? "green" : "black",
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        {formData.sell_dtls.map((item, idx) => {
                            return (<div className="row mb-2" key={idx}>
                                <div className="col-md-4">
                                    <label>Product:</label>
                                    <Select
                                        options={productOptions}
                                        value={productOptions.find(
                                            (opt) => String(opt.value) === String(item.productID)
                                        )}
                                        onChange={(selected) =>
                                            handleProductChange(idx, "productID", selected.value)
                                        }
                                        formatOptionLabel={(option) => {
                                            // Highlight original product in blue and bold
                                            const isOriginal = option.value === item.originalProductID;
                                            return (
                                                <div
                                                    style={{
                                                        color: isOriginal ? "green" : "black",
                                                    }}
                                                >
                                                    {option.label}
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label>Qty:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.quantity}
                                        onChange={(e) => handleProductChange(idx, 'quantity', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label>Rate:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.rate}
                                        onChange={(e) => handleProductChange(idx, 'rate', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label>Subtotal:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.quantity * item.rate}
                                        disabled
                                    />
                                </div>
                            </div>);
                        })}

                        <div className="row mt-4">
                            <div className="col-md-3">
                                <label>Total:</label>
                                <input className="form-control" value={formData.totalBill} disabled />
                            </div>
                            <div className="col-md-3">
                                <label>Previous Due:</label>
                                <input className="form-control" value={formData.prevDue} disabled />
                            </div>
                            <div className="col-md-3">
                                <label>Paid:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={formData.paid}
                                    onChange={(e) => handleFieldChange("paid", e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label>Final Due:</label>
                                <input className="form-control" value={formData.due} disabled />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6 offset-md-3">
                                <button type="submit" className="btn btn-success btn-block" disabled={isSubmitting}>
                                    {isSubmitting ? "Processing..." : "Approve Memo"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
    );
};

export default ApprovePage;
