"use client";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DataTable from "react-data-table-component";
import axios from "@/lib/axios";
import Link from "next/link";

const Ledger = () => {
    const [AvailableCustomer, setAvailableCustomer] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [customerID, setCustomerID] = useState('');
    const [filterText, setFilterText] = useState('');
    const [SelectedSellMemoDetails, setSelectedSellMemoDetails] = useState(null);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const CustomerAdd = `${apiAdd}/customers`;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch the list of customers
        axios.get(CustomerAdd)
            .then((response) => setAvailableCustomer(response.data))
            .catch((error) => console.error('Error fetching Customer:', error));
    }, [CustomerAdd]);

    useEffect(() => {
        // Fetch transactions when customerID changes
        if (customerID) {
            axios.get(`${apiAdd}/customer/${customerID}/ledger`)
                .then((response) => setTransactions(response.data.sellMemos))
                .catch((error) => console.error('Error fetching transactions:', error));

            setSelectedCustomer(customerID);
        }
    }, [customerID,apiAdd]);

    const CustomerOption = AvailableCustomer.map((customer) => ({
        value: customer.c_id,
        label: customer.name,
        address: customer.address,
    }));
    const columns = [
        {
            name: 'SellMemoID',
            selector: (row) => (
                <a href="#" onClick={() => handleSellMemoClick(row)}>
                    {row.SellMemoID}
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
            name: 'Total_Bill',
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
            name: 'Due',
            selector: (row) => row.Due,
            sortable: true,
            filter: 'text', // Use text filter for 'Due'
        },
    ];
    const handleSellMemoClick = (sellMemo) => {
        // Fetch detailed information using Laravel API
        axios.get(`${apiAdd}/sellMemoDetails/${sellMemo.SellMemoID}`)
            .then((response) => {
                setSelectedSellMemoDetails(response.data);
                setShowModal(true);
            })
            .catch((error) => console.error('Error fetching Memo Details:', error));
    };
    const setColumns = () => {
        return [
            {
                name: 'Product',
                selector: 'ProductID',
                sortable: true,
                cell: (row) => (
                    <span>{row.product ? `${row.product.brand.BrandName} - ${row.product.category.ProductCat} - ${row.product.unit.UnitName}` : 'N/A'}</span>
                ),
            },
            {
                name: 'Quantity',
                selector: 'Quantity',
                sortable: true,
            },
            {
                name: 'Rate',
                selector: 'Rate',
                sortable: true,
            },
            {
                name: 'Sub Total',
                selector: 'SubTotal',
                sortable: true,
            }
        ];
    };
    const handleCloseModal = () => {
        // Close the modal
        setShowModal(false);
    };
    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.Date.toLowerCase().includes(filter.toLowerCase())||
            row.Due.toLowerCase().includes(filter.toLowerCase())

        );
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Customer</h1>
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
                                            <label>Customer ID:</label>
                                            <Select
                                                options={CustomerOption}
                                                value={CustomerOption.find((option) => option.value === customerID)}
                                                onChange={(selectedOption) => setCustomerID(selectedOption.value)}
                                            />
                                        </div>
                                        {/* Add more form groups as needed */}
                                    </div>

                                    {selectedCustomer && (
                                        <div>
                                            <h2>Transaction List for {AvailableCustomer.find((c) => c.c_id === selectedCustomer).name}</h2>

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
                                    {showModal && (
                                        <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
                                            <div className="modal-content">
                                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                                <h2>Memo Details</h2>
                                                <DataTable
                                                    columns={setColumns()}
                                                    data={SelectedSellMemoDetails.sell_dtls}
                                                    pagination
                                                    highlightOnHover
                                                    responsive
                                                />
                                            </div>
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
