"use client";
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useAuth} from "@/hooks/auth";

function TopNav() {
    const { user } = useAuth({ middleware: 'auth' });
    const { logout } = useAuth();
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link href="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link href="#" className="nav-link">Contact</Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item d-none d-sm-inline-block">
                    <Link href="/" className="nav-link">{user.name}</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <Link  href="#" className="btn btn-default btn-flat" onClick={logout}>Sign out</Link>
                </li>
            </ul>
        </nav>
    );
}

export default TopNav;
