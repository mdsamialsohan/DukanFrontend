'use client'


import ProtectedRoute from "@/app/(app)/ProtectedRoute";

export default function PurchaseLayout({ children }) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            {children}
        </ProtectedRoute>
    )
}
