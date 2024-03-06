"use client";
import React, {useEffect, useState} from 'react';
import axios from '@/lib/axios';
import Script from "next/script";

function BrandList(props) {
    const [ProBrands, setProBrands] = useState([]);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/ProductBrand`;
    useEffect(() => {
        const fetchProBrands = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setProBrands(response.data);
            } catch (error) {
                console.error('Error fetching Product Brands:', error);
            }
        };
        fetchProBrands();
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
                    <th>Brand ID</th>
                    <th>Brand Name</th>
                </tr>
                </thead>
                <tbody>
                {ProBrands.map((ProductBrands, index) => (
                    <tr key={index}>
                        <td>{ProductBrands.BrandID}</td>
                        <td>{ProductBrands.BrandName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BrandList;