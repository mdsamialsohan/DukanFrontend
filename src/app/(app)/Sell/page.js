"use client";
import React, { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";
import Select from "react-select";
import axios from "@/lib/axios";
import Image from "next/image";

const CreatePurchase = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBlank, setIsBlank] = useState(false);
    const router = useRouter();
    const [date, setDate] = useState('');
    const [CustomerID, setCustomerID] = useState('');
    const [products, setProducts] = useState([{ productID: '', quantity: '', rate: '' }]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [availableBrands, setAvailableBrands] = useState([]);
    const [availableCat, setAvailableCat] = useState([]);
    const [availableUnit, setAvailableUnit] = useState([]);
    const [AvailableCustomer, setAvailableCustomer] = useState([]);
    const [total, setTotal] = useState(0);
    const [Due, setDue] = useState(0);
    const [Pay, setPay] = useState(0);

    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ProductAdd = `${apiAdd}/Product`;
    const BrandAdd = `${apiAdd}/ProductBrand`;
    const CatAdd = `${apiAdd}/ProductCat`;
    const UnitAdd = `${apiAdd}/ProductUnit`;
    const CustomerAdd = `${apiAdd}/customers`;
    const SellAdd = `${apiAdd}/sell`;

    // Fetch available products when the component mounts
    useEffect(() => {
        // Adjust the API endpoint based on your Laravel backend
        axios.get(ProductAdd)
            .then((response) => setAvailableProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));

        axios.get(BrandAdd)
            .then((response) => setAvailableBrands(response.data))
            .catch((error) => console.error('Error fetching Brands:', error));

        axios.get(CatAdd)
            .then((response) => setAvailableCat(response.data))
            .catch((error) => console.error('Error fetching Category:', error));

        axios.get(UnitAdd)
            .then((response) => setAvailableUnit(response.data))
            .catch((error) => console.error('Error fetching Unit:', error));
        axios.get(CustomerAdd)
            .then((response) => setAvailableCustomer(response.data))
            .catch((error) => console.error('Error fetching Customers:', error));

    }, [ProductAdd,BrandAdd,CatAdd,UnitAdd,CustomerAdd]);

    useEffect(() => {
        // Calculate the total whenever products, quantities, or rates change
        const calculatedTotal = products.reduce((accumulator, product) => {
            const quantity = parseFloat(product.quantity) || 0; // Convert to float or default to 0
            const rate = parseFloat(product.rate) || 0; // Convert to float or default to 0
            return accumulator + quantity * rate;
        }, 0);
        setTotal(calculatedTotal);
    }, [products]);

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const handleAddProduct = () => {
        setProducts([...products, { productID: '', quantity: '', rate: '' }]);
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasEmptyFields = date === '' ||
            CustomerID === '' ||
            products.some(
            (product) =>
                product.productID === '' ||
                product.quantity === '' ||
                parseFloat(product.quantity) > parseFloat(productOptions.find((option) => option.value === product.productID)?.stock) ||
                product.rate === ''
        );
        if (hasEmptyFields) {
            setIsBlank(true);
            return;
        }
        if (isSubmitting) {
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post(SellAdd, {
                Date: date,
                c_id: CustomerID,
                products,
                Pay,
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Purchase successfully added');
                const responseData = await response.data;
                const memoId = responseData.memoId;
                window.open(`/SellMemo?MemoId=${memoId}`, '_blank');
                router.push(`/`);
            } else {
                console.error('Failed to add purchase');
                // Handle failure, show error message, etc.
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message, etc.
        }
    };
    const CustomerOption = AvailableCustomer.map((customer) => ({
        value: customer.c_id,
        label: customer.name,
        Due: parseInt(customer.due),
    }));

    const productOptions = availableProducts.map((availableProduct) => ({
        value: availableProduct.ProductID,
        label: `${availableBrands.find((Brand) => Brand.BrandID === availableProduct.BrandID)?.BrandName || ''} 
          (${availableCat.find((Cat) => Cat.ProductCatID === availableProduct.ProductCatID)?.ProductCat || ''})  -  
          ${availableUnit.find((Unit) => Unit.UnitID === availableProduct.UnitID)?.UnitName || ''}
          (${availableProduct.ProductUnit})`,
        stock: availableProduct.ProductUnit,
    }));

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Sell</h1>
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
                                    <h3 className="card-title">Memo</h3>
                                </div>
                                <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Add form fields for date, vendorID */}
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label>Date:</label>
                                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                            {date === '' && isBlank && <p className="text-danger">Date cannot be empty</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label>Customer ID:</label>
                                            <Select
                                                options={CustomerOption}
                                                value={CustomerOption.find((option) => option.value === CustomerID)}
                                                onChange={(selectedOption) => (setCustomerID(selectedOption.value), setDue(selectedOption.Due))}
                                            />
                                            {CustomerID === '' && isBlank && <p className="text-danger">Customer cannot be empty</p>}
                                        </div><div className="form-group col-md-4"></div><div className="form-group col-md-4"></div>
                                    </div>

                                    {/* Dynamic product fields */}
                                    {products.map((product, index) => (
                                        <div className="row" key={index}>
                                                <div className="form-group col-md-3">
                                                <label>Product ID:</label>
                                                    <Select
                                                        styles={{ width: '100%' }}
                                                        options={[{ value: '', label: 'Select Product' }, ...productOptions]}
                                                        value={productOptions.find((option) => option.value === product.ProductID)}
                                                        onChange={(selectedOption) => handleProductChange(index, 'productID', selectedOption.value)}
                                                    />
                                                    {product.productID === '' && isBlank && <p className="text-danger">Product cannot be empty</p>}
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label>Quantity:</label>
                                                <input
                                                    type="text" className="form-control"
                                                    value={product.quantity}
                                                    onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                                />
                                                {(product.quantity === '' || (parseFloat(product.quantity) > parseFloat(productOptions.find((option) => option.value === product.productID)?.stock))) && isBlank && <p className="text-danger">{product.quantity === '' ? 'Quantity cannot be empty' : 'Quantity cannot be more than available stock'}</p>}

                                            </div>
                                            <div className="form-group col-md-2">
                                                <label>Rate:</label>
                                                <input
                                                    type="text" className="form-control"
                                                    value={product.rate}
                                                    onChange={(e) => handleProductChange(index, 'rate', e.target.value)}
                                                />
                                                {product.rate === '' && isBlank && <p className="text-danger">Rate cannot be empty</p>}
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label>Sub Total:</label>
                                                <input
                                                    type="text" className="form-control"
                                                    value={product.rate*product.quantity}
                                                    disabled
                                                />
                                            </div>
                                                <div className="form-group col-md-2">
                                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => handleRemoveProduct(index)}>
                                                        <Image width="20" alt="remove" height="20" src="../../pic/remove.png"/>
                                                    </button>
                                                </div>
                                        </div>
                                    ))}

                                    {/* Button to add more products */}
                                    <div className="row form-group">
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-4">
                                            <button className="btn btn-warning"  type="button" onClick={handleAddProduct}>
                                                Add Product
                                            </button>
                                        </div>
                                        <div className="col-sm-4"></div>
                                    </div>

                                    {/* Submit button */}
                                    <div className="row form-group">
                                        <div className="form-group col-md-4"></div>
                                        <div className="form-group col-md-3"></div>
                                        <div className="form-group col-md-2">
                                            <label>Total:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={total}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="form-group col-md-4"></div>
                                        <div className="form-group col-md-3"></div>
                                        <div className="form-group col-md-2">
                                            <label>Due:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={Due}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="form-group col-md-4"></div>
                                        <div className="form-group col-md-3"></div>
                                        <div className="form-group col-md-2">
                                            <label>Bill:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={(Due+total)}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="form-group col-md-4"></div>
                                        <div className="form-group col-md-3"></div>
                                        <div className="form-group col-md-2">
                                            <label>Payment:</label>
                                            <input
                                                type="text" className="form-control"
                                                value={Pay}
                                                onChange={(e) => setPay(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="form-group col-md-4"></div>
                                        <div className="form-group col-md-3"></div>
                                        <div className="form-group col-md-2">
                                            <label>Final Debt:</label>
                                            <input
                                                type="text" className="form-control"
                                                value={(Due+total)-Pay} disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-4">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-success"> {isSubmitting? "Processing..." : "Purchasing"} </button>
                                        </div>
                                        <div className="col-sm-4"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
};

export default CreatePurchase;
