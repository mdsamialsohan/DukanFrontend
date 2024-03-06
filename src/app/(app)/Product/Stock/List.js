"use client";
import React, {useEffect, useState} from 'react';
import Script from "next/script";
import axios from "@/lib/axios";

function ProductList(props) {
    const [Pro, setPro] = useState([]);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/Product`;

    const [ProUnit, setProUnit] = useState([]);
    const UnitUrl = `${apiAdd}/ProductUnit`;

    const [ProBrands, setProBrands] = useState([]);
    const BrandUrl = `${apiAdd}/ProductBrand`;

    const [ProCat, setProCat] = useState([]);
    const CatUrl = `${apiAdd}/ProductCat`;

    useEffect(() => {
        const fetchPro = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setPro(response.data);
            } catch (error) {
                console.error('Error fetching Product Brands:', error);
            }
        };
        fetchPro();
        const fetchProUnit = async () => {
            try {
                const response = await axios.get(UnitUrl);
                setProUnit(response.data);
            } catch (error) {
                console.error('Error fetching Product Brands:', error);
            }
        };
        fetchProUnit();

        const fetchProBrands = async () => {
            try {
                const response = await axios.get(BrandUrl);
                setProBrands(response.data);
            } catch (error) {
                console.error('Error fetching Product Brands:', error);
            }
        };
        fetchProBrands();

        const fetchProCat = async () => {
            try {
                const response = await axios.get(CatUrl);
                setProCat(response.data);
            } catch (error) {
                console.error('Error fetching Product Category:', error);
            }
        };
        fetchProCat();
    }, [CatUrl,ApiUrl,BrandUrl,UnitUrl]);
    const handleModify = (id) => {
        // Implement the logic to modify the row with the given ID
        console.log(`Modify row with ID ${id}`);
    };
    return (
        <div className="card-body">
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Brand Name</th>
                    <th>Category Name</th>
                    <th>Unit</th>
                    <th>Product Stock</th>
                    <th>Avg. Expense</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody>
                {Pro.map((Product, index) => {
                    return (
                        <tr key={index}>
                            <td>{Product.ProductID}</td>
                            <td>{ProBrands.find(Brand => Brand.BrandID === Product.BrandID)?.BrandName || ' '} </td>
                            <td>{ProCat.find(Cat => Cat.ProductCatID === Product.ProductCatID)?.ProductCat || ' '} </td>
                            <td>{ProUnit.find(Units => Units.UnitID === Product.UnitID)?.UnitName || ' '} </td>
                            <td>{Product.ProductUnit}</td>
                            <td>{Product.ExpPerUnit}</td>
                            <td>{Product.Rate}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;