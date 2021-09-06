import { useRouter } from 'next/router'
import { useState } from "react"
import Head from '../components/head'

export default function Login() {
    const [alert, showAlert] = useState(false)
    const router = useRouter()

    const sendData = e => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: 'POST',
            body: new FormData(e.target)
        })
            .then(res => {
                status = res.status
                return res.json()
            })
            .then(data => {
                if (status != 200) {
                    showAlert(true)
                    e.target.reset()
                } else {
                    localStorage.setItem('user', JSON.stringify(data))
                    router.push('/dashboard')
                }
            })
    }

    return (
        <>
            <Head title="Log in" />
        
            <div className="container py-5" style={{ width: 450 }}>
                <h1 className="pb-4 text-center">Log in</h1>

                {alert && <div className="alert alert-danger">
                    Invalid email or password
                </div>}
                
                <div className="card shadow p-4">
                    <form onSubmit={sendData}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" required autoFocus />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Password</label>
                            <input type="password" id="password" name="password" className="form-control" required />
                        </div>

                        <button type="submit" className="btn btn-dark">Log in</button>
                    </form>
                </div>
            </div> 
        </>
    )
}