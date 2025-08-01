"use client";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from "@/lib/axios";
import Link from "next/link";
function Pending() {
    const [pendingMemos, setPendingMemos] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        axios.get(`${apiAdd}/pendingMemos`)
            .then(res => setPendingMemos(res.data.pendingMemos))
            .catch(err => console.error("Error fetching memos", err))
            .finally(() => setLoading(false));
    }, [apiAdd]);
    if (loading) return <div>Loading...</div>;
    const columns = [
        {
            name: 'Memo ID',
            selector: row => row.SellMemoID,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.customer?.name,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Address',
            selector: row => row.customer?.address,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Date',
            selector: row => row.Date,
            sortable: true,
            filter: 'numeric',
        },
        {
            name: 'TotalBill',
            selector: row => row.TotalBill,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Actions',
            cell: (row) => (
                <Link
                    href={`/Sell/Approval?MemoId=${row.SellMemoID}`}
                    className="btn btn-sm btn-primary"
                >
                    Approve
                </Link>
            ),
        },
    ];
    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.customer?.name.toLowerCase().includes(filter.toLowerCase()) ||
            row.customer?.address.toLowerCase().includes(filter.toLowerCase()) ||
            row.Date.toLowerCase().includes(filter.toLowerCase())
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
                data={customFilterText(pendingMemos, filterText)}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    );
}

export default Pending;
