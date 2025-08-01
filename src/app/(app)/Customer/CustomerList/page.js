'use client'
import React from 'react';
import CustomerList from "@/app/(app)/Customer/CustomerList/CustomerList";
import { useAuth } from '@/hooks/auth.js';
function Page() {
    const { user } = useAuth();
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Customer</h1>
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
                                    <h3 className="card-title">List</h3>
                                </div>
                                {/*Customer List */}
                                <CustomerList user={user} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Page;
