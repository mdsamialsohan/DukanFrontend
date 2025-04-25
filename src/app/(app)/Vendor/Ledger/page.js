"use client";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DataTable from "react-data-table-component";
import axios from "@/lib/axios";

const Ledger = () => {
    const [AvailableVendor, setAvailableVendor] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [VendorID, setVendorID] = useState('');
    const [filterText, setFilterText] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const VendorAdd = `${apiAdd}/VendorList`;

    useEffect(() => {
        axios.get(VendorAdd)
            .then((response) => setAvailableVendor(response.data))
            .catch((error) => console.error('Error fetching Vendor:', error));
    }, [VendorAdd]);

    useEffect(() => {
        if (VendorID) {
            axios.get(`${apiAdd}/vendor/${VendorID}/ledger`)
                .then((response) => setTransactions(response.data.purchaseMemos))
                .catch((error) => console.error('Error fetching transactions:', error));

            setSelectedVendor(VendorID);
        }
    }, [VendorID,apiAdd]);

    const VendorOption = AvailableVendor.map((vendor) => ({
        value: vendor.VendorID,
        label:`${vendor.VendorName} - ${vendor.VendorAddress}`,
        address: vendor.VendorAddress,
    }));
    const columns = [
        {
            name: 'ID',
            selector: (row) => (
                <a href={`/Purchase/Memo?MemoId=${row.PurMemoID}`} target="_blank" rel="noopener noreferrer">
                    {row.PurMemoID}
                </a>
            ),
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row) => row.Date,
            sortable: true,
        },
        {
            name: 'Total Bill',
            selector: (row) => row.TotalBill,
            sortable: true,
            filter: 'text', // Use text filter for 'Name'
        },
        {
            name: 'Paid',
            selector: (row) => row.Paid,
            sortable: true,
            filter: 'text', // Use text filter for 'Address'
        },
        {
            name: 'Debt',
            selector: (row) => row.Debt,
            sortable: true,
            filter: 'text', // Use text filter for 'Due'
        },
    ];

    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.Date.toLowerCase().includes(filter.toLowerCase())||
            row.TotalBill.toLowerCase().includes(filter.toLowerCase())||
            row.Paid.toLowerCase().includes(filter.toLowerCase())||
            row.Debt.toLowerCase().includes(filter.toLowerCase())
        );
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
                                    <h3 className="card-title">Ledger</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label>Select Vendor:</label>
                                            <Select
                                                options={VendorOption}
                                                value={VendorOption.find((option) => option.value === VendorID)}
                                                onChange={(selectedOption) => setVendorID(selectedOption.value)}
                                            />
                                        </div>
                                        {/* Add more form groups as needed */}
                                    </div>

                                    {selectedVendor && (
                                        <div>
                                            <h2>Transaction List for {AvailableVendor.find((c) => c.VendorID === selectedVendor).VendorName}</h2>

                                            <input
                                                type="text"
                                                placeholder="Search by Due, Total bill or Date"
                                                value={filterText}
                                                onChange={(e) => setFilterText(e.target.value)}
                                            />
                                            <DataTable
                                                columns={columns}
                                                data={customFilterText(transactions, filterText)}
                                                pagination
                                                highlightOnHover
                                                responsive
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Ledger;
