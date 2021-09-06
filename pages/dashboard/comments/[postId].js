import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from '../../../components/head'
import { truncate } from '../../../utils'

export default function Comments({ post, comments, page, limit }) {
    const router = useRouter()
    const [alert, showAlert] = useState(false)

    const sendData = (e, commentId) => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${commentId}`, {method: 'DELETE'})
            .then(res => {
                if (res.status == 200) {
                    showAlert(true)
                    router.push(`/dashboard/comments/${post._id}`)
                }

                return res.json()
            })
    }

    return (
        <>
            <Head title={`Comments | ${post.title}`} />

            <div className="container mt-5">
                <h1>Comments ({comments.items.length})</h1>
                <h4 className="fst-italic mb-5">{post.title}</h4>

                {alert && <div className="alert alert-success mb-3">
                    Comment has been deleted successfully
                </div>}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Author</th>
                            <th scope="col">Content</th>
                            <th scope="col">Created at</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {comments.items.map((comment, index) => (
                            <tr key={index} className="align-middle">
                                <th scope="row">{index + 1}</th>
                                <td>{comment.author}</td>
                                <td>{truncate(comment.content, 290)}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <form onSubmit={e => sendData(e, comment._id)}>
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
                        {comments.page > 1 && <li className="page-item">
                            <button className="page-link text-dark" onClick={() => router.push(`?page=${page - 1}&limit=${limit}`)}>
                                &laquo;
                            </button>
                        </li>}

                        {comments.totalPages > 1 && <li className="page-item page-link text-dark">
                            Page {comments.page}/{comments.totalPages}
                        </li>}
                        
                        {comments.page < comments.totalPages && <li className="page-item">
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

export async function getServerSideProps({ params, query : {page = 1, limit = 5} }) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${params.postId}/?page=${page}&limit=${limit}`)
    const comments = await res.json()

    const postId = comments.items.map((comment) => {
        return comment.postId
    })

    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/id/${postId[0]}`)
    const post = await res.json()

    return {
        props: {
            post: post,
            comments: comments,
            page: parseInt(page),
            limit: limit
        }
    }
}