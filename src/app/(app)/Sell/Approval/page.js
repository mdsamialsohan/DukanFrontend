import React from 'react';
import ApprovalPage from "@/app/(app)/Sell/Approval/FormPage";
function Page() {

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
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
                                    <h3 className="card-title">Pending Memo View</h3>
                                </div>
                                {/*Customer List */}
                                <ApprovalPage/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Page;
