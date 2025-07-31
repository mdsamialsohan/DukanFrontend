'use client'


import ProtectedRoute from "@/app/(app)/ProtectedRoute";

export default function ExpenseLayout({ children }) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            {children}
        </ProtectedRoute>
    )
}
