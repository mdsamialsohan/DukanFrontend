"use client";
import React, { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";
import Select from "react-select";
import axios from "@/lib/axios";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const CreatePurchase = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBlank, setIsBlank] = useState(false);
    const router = useRouter();
    const [date, setDate] = useState('');
    const [vendorID, setVendorID] = useState('');
    const [products, setProducts] = useState([{ productID: '', quantity: '', rate: '' }]);
    const [total, setTotal] = useState(0);
    const [Debt, setDebt] = useState(0);
    const [Pay, setPay] = useState(0);

    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ProductAdd = `${apiAdd}/Product`;
    const BrandAdd = `${apiAdd}/ProductBrand`;
    const CatAdd = `${apiAdd}/ProductCat`;
    const UnitAdd = `${apiAdd}/ProductUnit`;
    const VendorAdd = `${apiAdd}/VendorList`;
    const PurchaseAdd = `${apiAdd}/Purchase`;

    const { data: availableProducts } = useSWR(ProductAdd,fetcher);
    const { data: availableBrands } = useSWR(BrandAdd,fetcher);
    const { data: availableCat } = useSWR(CatAdd,fetcher);
    const { data: availableUnit } = useSWR(UnitAdd,fetcher);
    const { data: availableVendor } = useSWR(VendorAdd,fetcher);

    const VendorOptions = availableVendor?.map((vendor) => ({
        value: vendor.VendorID,
        label: `${vendor.VendorName} - ${vendor.VendorAddress}`,
        debt: parseInt(vendor.Debt),
    })) || [];

    const productOptions = availableProducts?.map((availableProduct) => {
        const brandName = availableBrands?.find((Brand) => Brand.BrandID === availableProduct.BrandID)?.BrandName || '';
        const productCat = availableCat?.find((Cat) => Cat.ProductCatID === availableProduct.ProductCatID)?.ProductCat || '';
        const unitName = availableUnit?.find((Unit) => Unit.UnitID === availableProduct.UnitID)?.UnitName || '';

        return {
            value: availableProduct.ProductID,
            label: `${brandName} (${productCat}) - ${unitName} (${availableProduct.ProductUnit})`,
        };
    }) || [];

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
        const hasEmptyFields =
            date === '' ||
            vendorID === '' ||
            products.some(
            (product) =>
                product.productID === '' ||
                product.quantity === '' ||
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
            const response = await axios.post(PurchaseAdd, {
                Date:date,
                VendorID:vendorID,
                products,
                Pay,
            });

            if (response.status >= 200 && response.status < 300)  {
                console.log('Purchase successfully added');
                // Redirect or handle success as needed
                router.push('/');
            } else {
                console.error('Failed to add purchase');
                // Handle failure, show error message, etc.
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message, etc.
        }
    };


    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Purchase</h1>
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
                                    <h3 className="card-title">Purchase Memo</h3>
                                </div>
                                <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label>Date:</label>
                                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                            {date === '' && isBlank && <p className="text-danger">Date cannot be empty</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label>Vendor ID:</label>
                                            <Select
                                                options={VendorOptions}
                                                value={VendorOptions.find((option) => option.value === vendorID)}
                                                onChange={(selectedOption) => (setVendorID(selectedOption.value), setDebt(selectedOption.debt))}
                                            />
                                            {vendorID === '' && isBlank && <p className="text-danger">Date cannot be empty</p>}
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
                                                {product.quantity === '' && isBlank && <p className="text-danger">Quantity cannot be empty</p>}
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
                                                    <button type="button" className="btn" aria-label="Close" onClick={() => handleRemoveProduct(index)}>
                                                        <Image
                                                            src="/remove.png"
                                                            width={30}
                                                            height={30}
                                                            alt="Remove"
                                                        />
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
                                            <label>Debt:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={Debt}
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
                                                value={(Debt+total)}
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
                                                value={(Debt+total)-Pay} disabled
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
