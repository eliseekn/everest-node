import { useState } from "react"
import Head from '../../../components/head'

export default function Edit({ post }) {
    const [alert, showAlert] = useState(false)
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
        
    const sendData = (e, postId) => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`, {
            method: 'PUT',
            body: new FormData(e.target)
        })
            .then(res => {
                if (res.status == 200) {
                    showAlert(true)
                }

                res.json()
            })
    }

    return (
        <>
            <Head title="Edit post" />
        
            <div className="container mt-5">
                <h1 className="mb-5">Edit post</h1>

                <div className="card shadow-sm">
                    <div className="card-body">
                        {alert && <div className="alert alert-success">
                            Post has been updated successfully
                        </div>}
                        
                        <form encType="multipart/form-data" onSubmit={e => sendData(e, post._id)}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" id="title" name="title" className="form-control" value={title} onChange={() => setTitle()} required autoFocus />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="file" className="form-label">Image</label>
                                <input type="file" id="file" name="file" className="form-control" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <textarea id="content" name="content" className="form-control" value={content} onChange={() => setContent()} required></textarea>
                            </div>

                            <button type="submit" className="btn btn-dark">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${params.slug}`)
    const post = await res.json()

    return {
        props: { post }
    }
}
