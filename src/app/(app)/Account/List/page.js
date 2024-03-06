import React from 'react';
import List from "@/app/(app)/Account/List/List";
function Page() {

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Account</h1>
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
                                    <h3 className="card-title">Account List</h3>
                                </div>

                            <List/>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </div>

    )
}
export default Page;
