'use client'


import ProtectedRoute from "@/app/(app)/ProtectedRoute";

export default function AccountLayout({ children }) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            {children}
        </ProtectedRoute>
    )
}
