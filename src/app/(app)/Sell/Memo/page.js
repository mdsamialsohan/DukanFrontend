"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useSearchParams } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams();
    const MemoID = searchParams.get("MemoId");
    const [SelectedMemo, setSelectedMemo] = useState(null);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;

    useEffect(() => {
        axios
            .get(`${apiAdd}/sellMemoDetails/${MemoID}`)
            .then((response) => setSelectedMemo(response.data.sellMemo))
            .catch((error) => console.error("Error fetching memo:", error));
    }, [apiAdd, MemoID]);

    const transformedData = SelectedMemo
        ? SelectedMemo.sell_dtls.map((sellDtl) => ({
            productName: sellDtl.product?.brand?.BrandName || "n/a",
            productCat: sellDtl.product?.category?.ProductCat || "n/a",
            productUnit: sellDtl.product?.unit?.UnitName || "n/a",
            Quantity: sellDtl.Quantity || "n/a",
            Rate: sellDtl.Rate || "n/a",
            SubTotal: sellDtl.SubTotal || "n/a",
        }))
        : [];

    const handlePrint = () => {
        const printContent = document.getElementById("printable-area").innerHTML;
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
      <html>
        <head>
          <title>Sell Memo</title>
          <style>
            @page {
              size: A5 portrait;
              margin: 0;
            }

            body {
              font-family: Arial, sans-serif;
              font-size: 9pt;
              line-height: 1.25;
              margin: 0;
              padding: 0;
              position: relative;
              width: 148mm;
              height: 210mm;
              box-sizing: border-box;
            }

            /* --- Header spacing --- */
            .header-space {
              height: 38mm; /* roughly 1.5 inches (for preprinted letterhead) */
            }

            /* --- Memo No --- */
            .memo-no {
              text-align: center;
              font-weight: bold;
              margin-bottom: 4mm;
            }

            /* --- Customer Info --- */
            .info {
              display: flex;
              justify-content: space-between;
              padding: 0 30mm;
              font-size: 9pt;
              margin-bottom: 8mm;
            }

            .info-left {
              flex: 1;
            }
            .info-right {
              text-align: right;
              min-width: 40mm;
            }

            /* --- Product List --- */
            .product-table {
              width: 100%;
              border-collapse: collapse;
              padding: 0 8mm;
              font-size: 9pt;
            }

            .product-table td {
              border-bottom: 0.3px dotted #999;
              padding: 2px 8mm;
              vertical-align: top;
            }

            .product-name {
              width: 60%;
              padding-left: 35mm;
            }
            .product-qty, .product-rate, .product-subtotal {
              text-align: right;
              padding-right: 10mm;
              width: 13%;
            }

            /* --- Totals fixed bottom-right --- */
            .summary {
              position: absolute;
              bottom: 10mm;
              right: 8mm;
              text-align: right;
              font-weight: bold;
              font-size: 9pt;
            }

            .summary p {
              margin: 1mm 0;
            }

            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
        newWindow.document.close();
        newWindow.print();
    };

    return (
        <div className="content-wrapper">
            <section className="content">
                <div className="container-fluid">
                    {SelectedMemo && SelectedMemo.customer && (
                        <div className="card card-info">
                            <div className="card-header">
                                <h3 className="card-title">Memo View</h3>
                            </div>

                            <div className="card-body">
                                <div id="printable-area">
                                    {/* Reserved header area */}
                                    <div className="header-space"></div>

                                    {/* Memo number centered */}
                                    <div className="memo-no">
                                        Memo No: {SelectedMemo.SellMemoID}
                                    </div>

                                    {/* Customer name + address on left, date on right */}
                                    <div className="info">
                                        <div className="info-left">
                                            <p><b>Name:</b> {SelectedMemo.customer.name}</p>
                                            <p><b>Address:</b> {SelectedMemo.customer.address}</p>
                                        </div>
                                        <div className="info-right">
                                            <p><b>Date:</b> {SelectedMemo.Date}</p>
                                        </div>
                                    </div>

                                    {/* Product lines */}
                                    <table className="product-table">
                                        <tbody>
                                        {transformedData.map((row, index) => (
                                            <tr key={index}>
                                                <td className="product-name">
                                                    {row.productName} - {row.productCat} - {row.productUnit}
                                                </td>
                                                <td className="product-qty">{row.Quantity}</td>
                                                <td className="product-rate">{parseFloat(row.Rate).toFixed(2)}</td>
                                                <td className="product-subtotal">{parseFloat(row.SubTotal).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                    {/* Totals bottom-right */}
                                    <div className="summary">
                                        <p>Total Bill: {SelectedMemo.TotalBill}</p>
                                        <p>Prev. Due: {SelectedMemo.PrevDue}</p>
                                        <p>
                                            Total:{" "}
                                            {(
                                                parseFloat(SelectedMemo.PrevDue) +
                                                parseFloat(SelectedMemo.TotalBill)
                                            ).toFixed(2)}
                                        </p>
                                        <p>Paid: {SelectedMemo.Paid}</p>
                                        <p>Final Due: {SelectedMemo.Due}</p>
                                    </div>
                                </div>

                                {/* Print button */}
                                <div className="text-center mt-4">
                                    <button className="btn btn-info btn-sm" onClick={handlePrint}>
                                        Print
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Page;


