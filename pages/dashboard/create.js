import { useState } from "react"
import Head from '../../components/head'

export default function Create() {
    const { NEXT_PUBLIC_API_URL } = process.env
    const [alert, showAlert] = useState(false)

    const sendData = e => {
        e.preventDefault()

        fetch(`${NEXT_PUBLIC_API_URL}/post`, {
            method: 'POST',
            body: new FormData(e.target)
        })
            .then(res => {
                if (res.status == 200) {
                    showAlert(true)
                    e.target.reset()
                }

                res.json()
            })
            .then(data => console.log(data))
    }

    return (
        <>
            <Head title="Create post" />
        
            <div className="container mt-5">
                <h1 className="mb-5">Create post</h1>

                <div className="card shadow-sm">
                    <div className="card-body">
                        {alert && <div className="alert alert-success">
                            Post has been created successfully
                        </div>}

                        <form encType="multipart/form-data" onSubmit={sendData}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" id="title" name="title" className="form-control" required autoFocus />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="file" className="form-label">Image</label>
                                <input type="file" id="file" name="file" className="form-control" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <textarea id="content" name="content" className="form-control" required></textarea>
                            </div>

                            <button type="submit" className="btn btn-dark">Save</button>
                        </form>
                    </div>
                </div>
            </div> 
        </>
    )
}