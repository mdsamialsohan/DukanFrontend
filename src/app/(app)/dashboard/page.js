"use client";
import Link from "next/link";
import useSWR from 'swr';
import fetcher from "@/lib/fetcher";
// export const metadata = {
//     title: 'Dookan - Dashboard',
// }

const Dashboard = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const apiAdd = process.env.NEXT_PUBLIC_API_ADDRESS;
    const apiUrl = `${apiAdd}/TotalBillByDate/${formattedDate}`;
    const apiPay = `${apiAdd}/TotalPayByDate/${formattedDate}`;
    const apiExp = `${apiAdd}/TotalExpByDate/${formattedDate}`;
    const apiDue = `${apiAdd}/TotalDue`;
    const apiDebt = `${apiAdd}/TotalDebt`;
    const apiProductvalue = `${apiAdd}/ProductValue`;
    // Use SWR to fetch data
    const { data, error } = useSWR(apiUrl, fetcher);
    const { data:Paid, error1 } = useSWR(apiPay, fetcher);
    const { data:Due, error2 } = useSWR(apiDue, fetcher);
    const { data:Debt, error3 } = useSWR(apiDebt, fetcher);
    const { data:ProductValue, error4 } = useSWR(apiProductvalue, fetcher);
    const { data:Exp, error5 } = useSWR(apiExp, fetcher);
    if (error) {
        console.error('Failed to fetch data:', error);
    }
    if (error1) {
        console.error('Failed to fetch data:', error1);
    }
    if (error2) {
        console.error('Failed to fetch data:', error2);
    }
    if (error3) {
        console.error('Failed to fetch data:', error3);
    }
    if (error4) {
        console.error('Failed to fetch data:', error4);
    }
    if (error5) {
        console.error('Failed to fetch data:', error5);
    }
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link href="#">Home</Link></li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{data?.total_bill ? `${data.total_bill} BDT` : 'Loading...'}</h3>
                                    <p>Todays Sold Product</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                                <Link href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{Paid?.Paid ? `${Paid.Paid} BDT` : 'Loading...'}</h3>
                                    <p>Todays Collections</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                                <Link href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{Due?.due ? `${parseInt(Due.due)} BDT` : 'Loading...'}</h3>
                                    <p>Todays Due</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                                <Link href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>{Debt?.Debt ? `${parseInt(Debt.Debt)} BDT` : 'Loading...'}</h3>
                                    <p>Todays Debt</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                                <Link href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{ProductValue?.TotalPrice ? `${parseInt(ProductValue.TotalPrice)} BDT` : 'Loading...'}</h3>
                                    <p>Products on Stock</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                                <Link href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>{Exp?.total_exp ? `${parseInt(Exp.total_exp)} BDT` : 'Loading...'}</h3>
                                    <p>Todays Expense</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                                <Link href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Horizontal Form</h3>
                                </div>
                                <div className="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Dashboard
