'use client';
import {useEffect} from "react";

export default function AddJS()
{
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min").then((bootstrap) => {
        });
        import("@/app/Component/admin/adminlte");
    }, []);
    return <></>
}