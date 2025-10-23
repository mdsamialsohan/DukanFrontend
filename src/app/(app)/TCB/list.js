"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { QRCodeCanvas } from "qrcode.react";

function TcbsQrCodes() {
    const [tcbs, setTcbs] = useState([]);
    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const ApiUrl = `${apiAdd}/tcbs`;

    // Transform each character by prefixing '3'
    const transformSecret = (str) =>
        str ? str.split("").map((char) => "3" + char).join("") : "";

    useEffect(() => {
        const fetchTcbs = async () => {
            try {
                const response = await axios.get(ApiUrl);
                setTcbs(response.data);
            } catch (error) {
                console.error("Error fetching TCBs:", error);
            }
        };
        if (apiAdd) fetchTcbs();
        else console.error("NEXT_PUBLIC_API_ADDRESS is not set");
    }, [ApiUrl, apiAdd]);

    return (
        <div className="card-body">
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NID</th>
                    <th>FCN</th>
                    <th>NID Secret</th>
                    <th>FCN Secret</th>
                    <th>QR Code</th>
                </tr>
                </thead>
                <tbody>
                {tcbs.map(({ id, nid, fcn }) => {
                    const nidSecret = transformSecret(nid);
                    const fcnSecret = transformSecret(fcn);
                    const qrValue = `${nidSecret},${fcnSecret}`;

                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{nid}</td>
                            <td>{fcn}</td>
                            <td>{nidSecret}</td>
                            <td>{fcnSecret}</td>
                            <td>
                                <QRCodeCanvas
                                    value={qrValue}
                                    size={100}
                                    bgColor="#fff"
                                    fgColor="#000"
                                    level="H"
                                    includeMargin
                                />
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default TcbsQrCodes;
