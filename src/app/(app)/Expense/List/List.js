"use client";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from "@/lib/axios";
import Link from "next/link";
function CustomerList() {
    const [ExpList, setExpList] = useState([]);
    const [filterText, setFilterText] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/ExpView`;

    useEffect(() => {
        const fetchExp = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setExpList(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchExp();
    }, [ApiUrl]);

    const columns = [
        {
            name: 'Expense ID',
            selector: row => row.ExpListID,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.Date,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Expense Account',
            selector: row => row.exp.ExpName,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.Amount,
            sortable: true,
            filter: 'numeric',
        },
        {
            name: 'Note',
            selector: row => row.Ref,
            sortable: true,
            filter: 'text',
        },
    ];
    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.exp.ExpName.toLowerCase().includes(filter.toLowerCase()) ||
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
                data={customFilterText(ExpList, filterText)}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    );
}

export default CustomerList;
