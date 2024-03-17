'use client';
import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
const Page = () => {
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ProductAdd = `${apiAdd}/BalanceSheet`;
    const { data: bSheet } = useSWR(ProductAdd,fetcher);
    const Balance = bSheet?.map((data) => ({
        value: (parseFloat(data.TotalDue)+parseFloat(data.TotalProductPrice)+parseFloat(data.TotalAccount)+parseFloat(data.TotalUserCash))-parseFloat(data.TotalDebt),
        name:  new Date(data.created_at).toLocaleDateString(),
        TotalDebt: parseFloat(data.TotalDebt),
        TotalDue: parseFloat(data.TotalDue),
        TotalProductPrice: parseFloat(data.TotalProductPrice),
        TotalBalance: parseFloat(data.TotalProductPrice)+parseFloat(data.TotalUserCash),
    })) || [];

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link href="#">Home</Link></li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
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
                        <h3 className="card-title">Balance Sheet</h3>
                    </div>
                    <div className="card-body">
                        <LineChart
                            width={800}
                            height={450}
                            data={Balance}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Total Balance" stroke="#6601f7" name="Total Balance" />
                            <Line type="monotone" dataKey="value" stroke="#f62e12" name="Equity"/>
                            <Line type="monotone" dataKey="TotalDebt" stroke="#fe00b9" name="Total Debt" />
                            <Line type="monotone" dataKey="TotalDue" stroke="#09e1e5" name="Total Due" />
                            <Line type="monotone" dataKey="TotalProductPrice" stroke="#0ad156" name="Total Product Price" />

                        </LineChart>
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
