"use client";
import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import axios from "@/lib/axios";

const Page = () => {
    const [SelectedMemo, setSelectedMemo] = useState(null);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const MemoID = 9;

    useEffect(() => {
            axios.get(`${apiAdd}/sellMemoDetails/${MemoID}`)
                .then((response) => setSelectedMemo(response.data.sell_dtls))
                .catch((error) => console.error('Error fetching transactions:', error));
    }, [apiAdd,MemoID]);
    const setColumns = () => {
        return [
            {
                name: 'Product',
                selector: 'ProductID',
                sortable: true,
            },
        ];
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Sell</h1>
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
                                    <h3 className="card-title">Memo List</h3>
                                </div>
                                <div className="card-body">
                                    <div>
                                        <DataTable
                                            columns={setColumns()}
                                            data={SelectedMemo}
                                            pagination
                                            highlightOnHover
                                            responsive
                                        />
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
