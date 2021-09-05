import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Head from '../../components/head'
import { truncate } from '../../utils'

export default function Dashboard({ posts, page, limit }) {
    const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_PUBLIC_URL } = process.env
    const router = useRouter()
    const [alert, showAlert] = useState(false)
    
    useEffect(() => {
        const value = localStorage.getItem('user');
        const user = !!value ? JSON.parse(value) : undefined;

        if (!user) {
            router.push('/login')
        }

        if (user && user.role != 'ROLE_ADMIN') {
            router.push('/')
        }
    }, [router])
    
    const sendData = (e, postId) => {
        e.preventDefault()

        fetch(`${NEXT_PUBLIC_API_URL}/post/${postId}`, {method: 'DELETE'})
            .then(res => {
                if (res.status == 200) {
                    showAlert(true)
                    router.push('/dashboard')
                }

                res.json()
            })
            .then(data => console.log(data))
    }

    return (
        <>
            <Head title="Dashboard" />

            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1>Posts ({posts.items.length})</h1>
                    <Link href="/dashboard/create">
                        <a className="btn btn-dark" target="_blank">Create post</a>
                    </Link>
                </div>

                {alert && <div className="alert alert-success mb-3">
                    Post has been deleted successfully
                </div>}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Created at</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.items.map((post, index) => (
                            <tr key={index} className="align-middle">
                                <th scope="row">{index + 1}</th>
                                <td><Image src={`${NEXT_PUBLIC_API_PUBLIC_URL}/${post.image}`} className="img-fluid" alt="Image de l'article" width="200" height="200" /></td>
                                <td>{post.title}</td>
                                <td>{truncate(post.content, 290)}</td>
                                <td>{post.createdAt}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Link href={`/dashboard/comments/${post._id}`}>
                                            <a title="Comments" target="_blank">
                                                <i className="bi bi-chat-fill text-primary"></i>
                                            </a>
                                        </Link>

                                        <Link href={`/dashboard/edit/${post.slug}`}>
                                            <a className="mx-2" title="Edit" target="_blank">
                                                <i className="bi bi-pencil-square text-primary"></i>
                                            </a>
                                        </Link>

                                        <form onSubmit={e => sendData(e, post._id)}>
                                            <button type="submit" title="Delete" className="btn px-0">
                                                <i className="bi bi-trash-fill text-danger"></i>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav className="my-5">
                    <ul className="pagination justify-content-center">
                        {posts.page > 1 && <li className="page-item">
                            <button className="page-link text-dark" onClick={() => router.push(`?page=${page - 1}&limit=${limit}`)}>
                                &laquo;
                            </button>
                        </li>}

                        {posts.totalPages > 1 && <li className="page-item page-link text-dark">
                            Page {posts.page}/{posts.totalPages}
                        </li>}
                        
                        {posts.page < posts.totalPages && <li className="page-item">
                            <button className="page-link text-dark" onClick={() => router.push(`?page=${page + 1}&limit=${limit}`)}>
                                &raquo;
                            </button>
                        </li>}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export async function getServerSideProps({ query: { page = 1, limit = 5 } }) {
    const { NEXT_PUBLIC_API_URL } = process.env
    
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/post?page=${page}&limit=${limit}`)
    const posts = await res.json()

    return {
        props: {
            posts: posts,
            page: parseInt(page),
            limit: limit
        }
    }
}