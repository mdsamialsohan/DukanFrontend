"use client";
import React, {useEffect, useState} from 'react';
import Script from "next/script";
import axios from "@/lib/axios";

function ProCatList(props) {
    const [ProCat, setProCat] = useState([]);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/ProductCat`;
    useEffect(() => {
        const fetchProCat = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setProCat(response.data);
            } catch (error) {
                console.error('Error fetching Product Category:', error);
            }
        };
        fetchProCat();
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
                    <th>Category ID</th>
                    <th>Product Category</th>
                </tr>
                </thead>
                <tbody>
                {ProCat.map((ProductCat, index) => (
                    <tr key={index}>
                        <td>{ProductCat.ProductCatID}</td>
                        <td>{ProductCat.ProductCat}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProCatList;