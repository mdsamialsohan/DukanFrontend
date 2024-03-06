"use client";
import React, {useEffect, useState} from 'react';
import Script from "next/script";
import axios from "@/lib/axios";

function VendorList(props) {
    const [vendors, setVendors] = useState([]);
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
    const handleModify = (id) => {
        // Implement the logic to modify the row with the given ID
        console.log(`Modify row with ID ${id}`);
    };
    return (
        <div className="card-body">
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Vendor ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Debt</th>
                    <th>Mobile</th>
                </tr>
                </thead>
                <tbody>
                {vendors.map((vendors, index) => (
                    <tr key={index}>
                        <td>{vendors.VendorID}</td>
                        <td>{vendors.VendorName}</td>
                        <td>{vendors.VendorAddress}</td>
                        <td>{vendors.Debt}</td>
                        <td>{vendors.VendorMobile}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default VendorList;