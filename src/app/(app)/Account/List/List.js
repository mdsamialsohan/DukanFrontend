"use client";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from "@/lib/axios";
function List() {
    const [Account, setAccount] = useState([]);
    const [filterText, setFilterText] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/Account`;

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setAccount(response.data);
            } catch (error) {
                console.error('Error fetching Account:', error);
            }
        };
        fetchAccount();
    }, [ApiUrl]);

    const columns = [
        {
            name: 'Account ID',
            selector: row => row.AccID,
            sortable: true,
        },
        {
            name: 'Account Name',
            selector: row => row.AccName,
            sortable: true,
            filter: 'text', // Use text filter for 'Name'
        },
        {
            name: 'Balance',
            selector: row => row.Balance,
            sortable: true,
            filter: 'text', // Use text filter for 'Address'
        },
    ];

    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.AccName.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <div className="card-body">
            <input
                type="text"
                placeholder="Search by Name, Balance, ID"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
            />
            <DataTable
                columns={columns}
                data={customFilterText(Account, filterText)}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    );
}

export default List;
