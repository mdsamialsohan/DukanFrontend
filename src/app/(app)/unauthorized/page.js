'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Unauthorized() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 1500)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="text-center p-10">
            <h1 className="text-2xl font-bold text-red-500">403 - Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
        </div>
    )
}
