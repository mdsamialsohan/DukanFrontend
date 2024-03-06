"use client";
import React, {useEffect, useState} from 'react';
import Script from "next/script";
import axios from "@/lib/axios";

function PurExpList(props) {
    const [PurExp, setPurExp] = useState([]);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/PurchaseExpList`;
    useEffect(() => {
        const fetchPurExp = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setPurExp(response.data);
            } catch (error) {
                console.error('Error fetching Purchase Expense:', error);
            }
        };
        fetchPurExp();
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
                    <th>Expense List ID</th>
                    <th>Expense Name</th>
                </tr>
                </thead>
                <tbody>
                {PurExp.map((PurE, index) => (
                    <tr key={index}>
                        <td>{PurE.PurExpListID}</td>
                        <td>{PurE.PurExpName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PurExpList;