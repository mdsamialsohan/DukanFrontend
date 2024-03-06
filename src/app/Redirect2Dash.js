'use client';
import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";

function Redirect2Dash(props) {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the dashboard page after 2 seconds (as an example)
        const redirectTimeout = setTimeout(() => {
            router.push('/dashboard');
        }, 2000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(redirectTimeout);
    }, [router]);
    return (
        <div></div>
    );
}

export default Redirect2Dash;
