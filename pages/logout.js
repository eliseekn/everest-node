import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Logout() {
    const router = useRouter()

    useEffect(() => {
        localStorage.removeItem('user')

        const value = localStorage.getItem('user');
        const user = !!value ? JSON.parse(value) : undefined;

        if (!user) router.push('/login')
    }, [router])

    return <p>Redirecting...</p>
}