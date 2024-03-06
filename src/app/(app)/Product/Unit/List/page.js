import React from 'react';
import UnitList from "@/app/(app)/Product/Unit/List/List";
import BrandList from "@/app/(app)/Product/Brand/List/List";
function Page() {

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Product</h1>
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
                                    <h3 className="card-title">Unit List</h3>
                                </div>
                                {/*Customer List */}
                                <UnitList/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Page;
