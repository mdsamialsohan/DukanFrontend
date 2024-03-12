"use client";
import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import axios from "@/lib/axios";
import {useSearchParams} from "next/navigation";
const Page = () => {
    const searchParams = useSearchParams();
    const MemoID = searchParams.get('MemoId');
    const [SelectedMemo, setSelectedMemo] = useState(null);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;

    useEffect(() => {
            axios.get(`${apiAdd}/sellMemoDetails/${MemoID}`)
                .then((response) => setSelectedMemo(response.data.sellMemo))
                .catch((error) => console.error('Error fetching transactions:', error));
    }, [apiAdd,MemoID]);

    const transformedData = SelectedMemo
        ? SelectedMemo.sell_dtls.flatMap((sellDtl) => ({
            productName: sellDtl.product ? sellDtl.product.brand.BrandName : 'n/a',
            productCat: sellDtl.product ? sellDtl.product.category.ProductCat: 'n/a',
            productUnit: sellDtl.product ? sellDtl.product.unit.UnitName : 'n/a',
            Quantity: sellDtl ? sellDtl.Quantity : 'n/a',
            Rate: sellDtl ? sellDtl.Rate : 'n/a',
            SubTotal: sellDtl ? sellDtl.SubTotal : 'n/a',
        }))
        : [];
    const handlePrint = () => {
        const printableContent = document.getElementById('printable-area');

        if (printableContent) {
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = `
      <html>
        <head>
          <title>Printable Content</title>
        </head>
        <body>
          ${printableContent.innerHTML}
        </body>
      </html>
    `;

            window.print();

            // Restore the original content after printing
            document.body.innerHTML = originalContents;
        }
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Sell memo</h1>
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
                                    <h3 className="card-title">Memo View</h3>
                                </div>{SelectedMemo && SelectedMemo.customer && (
                                <div className="card-body" >
                                    <div id="printable-area">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-7 text-center"><h3>M/S Sakib Khadyo Bhandar</h3> </div>
                                        <div className="col-md-4"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-7 text-center"><p>Driver Bazar, Shayestaganj, Habiganj</p> </div>
                                        <div className="col-md-4"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-7 text-center"><p>01711973467, 01783414878</p> </div>
                                        <div className="col-md-4"></div>
                                    </div>
                                            <div className="row">
                                                <div className="col-md-3"></div>
                                                <div className="col-md-4"><p><b>Name: </b>{SelectedMemo.customer.name}</p> </div>
                                                <div className="col-md-5"><b>Memo No: </b>{SelectedMemo.SellMemoID}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3"></div>
                                                <div className="col-md-4"><p><b>Address: </b>{SelectedMemo.customer.address}</p></div>
                                                <div className="col-md-5"><b>Date: </b>{SelectedMemo.Date}</div>
                                            </div>
                                    <div className="row">
                                    <div className="col-md-3"></div>
                                        <div className="col-md-6">
                                        <table className="table table-borderless">
                                        <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Sub Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {transformedData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.productName} - {row.productCat} - {row.productUnit}</td>
                                                <td>{row.Quantity}</td>
                                                <td>{row.Rate}</td>
                                                <td>{row.SubTotal}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                        </table></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7"></div>
                                        <div className="col-md-3"><p><b>Total Bill :  </b> {SelectedMemo.TotalBill}</p></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7"></div>
                                        <div className="col-md-3"><p><b>Due :  </b> {SelectedMemo.PrevDue}</p></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7"></div>
                                        <div className="col-md-3"><p><b>Total :  </b> {( parseFloat(SelectedMemo.PrevDue)+ parseFloat(SelectedMemo.TotalBill))}</p></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7"></div>
                                        <div className="col-md-3"><p><b>Paid :  </b> {SelectedMemo.Paid}</p></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7"></div>
                                        <div className="col-md-3"><p><b>Final Due :  </b> {SelectedMemo.Due}</p></div>
                                    </div>
                                </div>
                                    <div className="row">
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-1">
                                            <button className="btn btn-block bg-gradient-info btn-lg" onClick={handlePrint}>Print</button>
                                        </div>
                                        <div className="col-sm-6"></div>
                                    </div>
                            </div> )}
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
