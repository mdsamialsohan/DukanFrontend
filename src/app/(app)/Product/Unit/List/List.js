"use client";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from "@/lib/axios";

function UnitList(props) {
    const [ProUnit, setProUnit] = useState([]);
    const [filterText, setFilterText] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/ProductUnit`;

    useEffect(() => {
        const fetchProUnit = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setProUnit(response.data);
            } catch (error) {
                console.error('Error fetching Product Units:', error);
            }
        };
        fetchProUnit();
    }, [ApiUrl]);

    const handleModify = (id) => {
        // Implement the logic to modify the row with the given ID
        console.log(`Modify row with ID ${id}`);
    };

    const columns = [
        {
            name: 'Unit ID',
            selector: row => row.UnitID,
            sortable: true,
        },
        {
            name: 'Unit Name',
            selector: row => row.UnitName,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'KG',
            selector: row => row.Unit2KG,
            sortable: true,
            filter: 'text',
        },
    ];

    // Custom filter function
    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.UnitName.toLowerCase().includes(filter.toLowerCase()) ||
            row.row.Unit2KG.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <div className="card-body">
            <input
                type="text"
                placeholder="Search by Unit Name, Type"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
            />
            <DataTable
                columns={columns}
                data={customFilterText(ProUnit, filterText)}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    );
}

export default UnitList;
