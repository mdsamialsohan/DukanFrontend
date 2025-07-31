'use client'


import ProtectedRoute from "@/app/(app)/ProtectedRoute";

export default function VendorLayout({ children }) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            {children}
        </ProtectedRoute>
    )
}
