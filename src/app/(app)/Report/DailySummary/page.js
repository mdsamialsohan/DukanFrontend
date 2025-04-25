'use client';
import React, { useState } from 'react';
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const Page = () => {
    const [date, setDate] = useState('');

    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';

    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;

    const apiPurPaid = `${apiAdd}/GetPurPaid/${formattedDate}`;
    const apiSellPaid = `${apiAdd}/GetMemoPaid/${formattedDate}`;
    const apiSellMemo = `${apiAdd}/GetMemo/${formattedDate}`;
    const apiExp = `${apiAdd}/TotalExpByDate/${formattedDate}`;

    const { data:Sell, error } = useSWR(apiSellPaid, fetcher);
    const { data:SellMemo, error3 } = useSWR(apiSellMemo, fetcher);
    const { data:Pur, error1 } = useSWR(apiPurPaid, fetcher);
    const { data:Expense, error2 } = useSWR(apiExp, fetcher);

    if (error) {
        console.error('Failed to fetch data:', error);
    }
    if (error1) {
        console.error('Failed to fetch data:', error1);
    }
    if (error2) {
        console.error('Failed to fetch data:', error2);
    }
    if (error3) {
        console.error('Failed to fetch data:', error3);
    }


    const SellMemoOptions = SellMemo?.sellMemo?.map((sell) => ({
        cName: sell.customer?.name || 'n/a',
        cAddress: sell.customer?.address || 'n/a',
        Paid: sell.Paid || 'n/a',
        TotalBill: sell.TotalBill || 'n/a',
        products: sell.sell_dtls?.map((sellDtl) => ({
            productName: sellDtl.product?.brand?.BrandName || 'n/a',
            productCat: sellDtl.product?.category?.ProductCat || 'n/a',
            productUnit: sellDtl.product?.unit?.UnitName || 'n/a',
            Quantity: sellDtl?.Quantity || 'n/a',
            Rate: sellDtl?.Rate || 'n/a',
            SubTotal: sellDtl?.SubTotal || 'n/a',
        })) || []
    })) || [];

    const SellOptions = Sell?.sellMemo?.map((sell) => ({
        cName:sell.customer.name,
        cAddress: sell.customer.address,
        Paid: sell.Paid,
    })) || [];
    const totalSum = SellOptions.reduce((acc, option) => acc + parseFloat(option.Paid), 0);

    const PurOptions = Pur?.purMemo?.map((pur) => ({
        vName:pur.vendor.VendorName,
        vAddress: pur.vendor.VendorAddress,
        Paid: pur.Paid,
    })) || [];
    const totalpur = PurOptions.reduce((acc, option) => acc + parseFloat(option.Paid), 0);

    const ExpOptions = Expense?.exp?.map((xp) => ({
        xName:xp?.exp?.ExpName,
        xRef:xp?.Ref,
        xAmount: xp?.Amount,
    })) || [];
    const totalExp = ExpOptions.reduce((acc, option) => acc + parseFloat(option.xAmount), 0);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Report</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Select Date</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label>Date:</label>
                                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                        </div>
                                        {/* Add more form groups as needed */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Total Collection</h3>
                                </div>
                                <div className="card-body">
                                        <div>
                                            {SellOptions.map((option, index) => (
                                                <div key={index} style={{ marginBottom: '10px' }}>
                                                    <p style={{ margin: '0', marginBottom: '2px' }}><b>{option.cName}</b></p>
                                                    <p style={{ margin: '0', marginBottom: '2px' }}>{option.cAddress}</p>
                                                    <p style={{ margin: '0', marginBottom: '2px', color: 'red' }}>{option.Paid}</p>
                                                </div>
                                            ))}
                                            <p>Total Collection: {totalSum}</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Total Payment</h3>
                                </div>
                                <div className="card-body">
                                    <div>
                                        {PurOptions.map((option, index) => (
                                            <div key={index} style={{ marginBottom: '10px' }}>
                                                <p style={{ margin: '0', marginBottom: '2px' }}><b>{option.vName}</b></p>
                                                <p style={{ margin: '0', marginBottom: '2px' }}>{option.vAddress}</p>
                                                <p style={{ margin: '0', marginBottom: '2px', color: 'red' }}>{option.Paid}</p>
                                            </div>
                                        ))}
                                        <p>Total Collection: {totalpur}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Total Expenses</h3>
                                </div>
                                <div className="card-body">
                                    <div>
                                        {ExpOptions.map((option, index) => (
                                            <div key={index} style={{ marginBottom: '10px' }}>
                                                <p style={{ margin: '0', marginBottom: '2px' }}><b>{option.xName}</b></p>
                                                <p style={{ margin: '0', marginBottom: '2px' }}>{option.xRef}</p>
                                                <p style={{ margin: '0', marginBottom: '2px', color: 'red' }}>{option.xAmount}</p>
                                            </div>
                                        ))}
                                        <p>Total Expenses: {totalExp}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Sell Memo</h3>
                                </div>
                                <div className="card-body">
                                    <div>
                                        {SellMemoOptions.map((option, index) => (
                                            <div key={index} style={{ marginBottom: '10px' }}>
                                                <p style={{ margin: '0', marginBottom: '2px' }}><b>{option.cName}</b></p>
                                                <p style={{ margin: '0', marginBottom: '2px' }}>{option.cAddress}</p>
                                                {option.products.map((product, pIndex) => (
                                                <div key={pIndex} style={{ paddingLeft: "10px" }}>
                                                    <p>{product.Quantity} * {product.productName} {product.productCat} {product.productUnit} = {product.SubTotal}</p>
                                                </div>
                                                ))}
                                                <p style={{ margin: '0', marginBottom: '2px', color: 'red' }}>{option.TotalBill}</p>
                                            </div>
                                        ))}
                                    </div>
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
