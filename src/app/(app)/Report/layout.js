'use client'


import ProtectedRoute from "@/app/(app)/ProtectedRoute";

export default function ReportLayout({ children }) {
    return (
        <ProtectedRoute allowedRoles={['admin','salesman']}>
            {children}
        </ProtectedRoute>
    )
}
