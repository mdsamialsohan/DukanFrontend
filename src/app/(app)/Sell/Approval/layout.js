'use client'


import ProtectedRoute from "@/app/(app)/ProtectedRoute";

export default function ApproveLayout({ children }) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            {children}
        </ProtectedRoute>
    )
}
