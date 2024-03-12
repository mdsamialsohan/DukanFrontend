'use client';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from '@/lib/axios';

const Page = () => {
    const [selectedProductList, setSelectedProductList] = useState(null);
    const [productList, setProductList] = useState([]);
    const [date, setDate] = useState('');
    const [filterText, setFilterText] = useState('');
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;

    useEffect(() => {
        // Fetch sold products when date changes
        if (date) {
            axios.get(`${apiAdd}/SoldProduct/${date}`)
                .then((response) => setProductList(response.data.soldProducts))
                .catch((error) => console.error('Error fetching sold products:', error));
            setSelectedProductList(date);
        }
    }, [date, apiAdd]);

    const columns = [
        {
            name: 'Product Name',
            selector: (row) => row.product ? `${row.product.brand.BrandName} - ${row.product.category.ProductCat} - ${row.product.unit.UnitName}` : 'N/A',
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: (row) => row.totalQuantity,
            sortable: true,
        },
    ];

    const customFilterText = (rows, filter) => {
        return rows.filter((row) =>
            row.product.brand.BrandName.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Report</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Sold Product List</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label>Date:</label>
                                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                        </div>
                                        {/* Add more form groups as needed */}
                                    </div>

                                    {selectedProductList && (
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Search by Product Name"
                                                value={filterText}
                                                onChange={(e) => setFilterText(e.target.value)}
                                            />
                                            <DataTable
                                                columns={columns}
                                                data={customFilterText(productList, filterText)}
                                                pagination
                                                highlightOnHover
                                                responsive
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
