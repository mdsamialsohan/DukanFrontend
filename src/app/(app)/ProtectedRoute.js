'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/auth'

export default function ProtectedRoute({ allowedRoles = [], children }) {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()

    useEffect(() => {
        if (user && allowedRoles.length && !allowedRoles.includes(user.role)) {
            // Redirect unauthorized users immediately
            router.push('/unauthorized')
        }
    }, [user, allowedRoles, router])

    if (!user) {
        return <p>Loading...</p> // Or your loading spinner component
    }

    return children
}
