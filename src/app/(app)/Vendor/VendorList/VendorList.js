"use client";
import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import axios from "@/lib/axios";
function VendorList(props) {
    const [vendors, setVendors] = useState([]);
    const [filterText, setFilterText] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/VendorList`;

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setVendors(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchVendors();
    }, [ApiUrl]);
    const columns = [
        {
            name: 'Vendor ID',
            selector: row => row.VendorID,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.VendorName,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Address',
            selector: row => row.VendorAddress,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Debt',
            selector: row => row.Debt,
            sortable: true,
            filter: 'numeric',
        },
        {
            name: 'Mobile',
            selector: row => row.VendorMobile,
            sortable: true,
            filter: 'text',
        },
        {
            name: 'Actions',
            cell: (row) => (
                <a className="btn btn-primary btn-sm" href={`/Vendor/Update/${row.VendorID}`}>Update</a>
            ),
            allowOverflow: true,
            button: true,
        },
    ];
    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.VendorName.toLowerCase().includes(filter.toLowerCase()) ||
            row.VendorAddress.toLowerCase().includes(filter.toLowerCase()) ||
            row.Debt.toLowerCase().includes(filter.toLowerCase()) ||
            row.VendorMobile.toLowerCase().includes(filter.toLowerCase())
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
                data={customFilterText(vendors, filterText)}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    );
}

export default VendorList;