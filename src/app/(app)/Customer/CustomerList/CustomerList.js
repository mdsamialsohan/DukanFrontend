"use client";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from "@/lib/axios";
import Link from "next/link";
function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [filterText, setFilterText] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/customers`;

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, [ApiUrl]);

    const columns = [
        {
            name: 'Customer ID',
            selector: row => row.c_id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Due',
            selector: row => row.due,
            sortable: true,
            filter: 'numeric',
        },
        {
            name: 'Mobile',
            selector: row => row.mobile,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'National ID',
            selector: row => row.national_id,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Actions',
            cell: (row) => (
                <a className="btn btn-primary btn-sm" href={`/Customer/Update/${row.c_id}`}>Update</a>
            ),
            allowOverflow: true,
            button: true,
        },
    ];
    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.name.toLowerCase().includes(filter.toLowerCase()) ||
            row.address.toLowerCase().includes(filter.toLowerCase()) ||
            row.mobile.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <div className="card-body">
            <input
                type="text"
                placeholder="Search by Name, Address, Due, Mobile, National ID, Optional ID"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
            />
            <DataTable
                columns={columns}
                data={customFilterText(customers, filterText)}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    );
}

export default CustomerList;
