'use client'


import ProtectedRoute from "@/app/(app)/ProtectedRoute";

export default function ProductLayout({ children }) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            {children}
        </ProtectedRoute>
    )
}
