import Link from 'next/link'
import Image from 'next/image'
import Head from '../../components/head'

export default function Dashboard({ posts, page, limit }) {
    const { API_URL } = process.env

    //https://javascript.info/task/truncate
    const truncate = (str, length) => {
        return (str.length > length) ? str.slice(0, length - 1) + '...' : str;
    }

    const sendData = (e, postId) => {
        e.preventDefault()

        fetch(`${API_URL}/${postId}`, {method: 'DELETE'})
            .then(res => {
                if (res.status == 200) {
                    document.location.reload()
                }

                res.json()
            })
            .then(data => console.log(data))
    }

    return (
        <>
            <Head title="Dashboard" />

            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Posts</h1>
                    <Link href="/dashboard/create">
                        <a className="btn btn-dark">Create post</a>
                    </Link>
                </div>

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
                                <td><Image src={`http://127.0.0.1:3001/public/uploads/${post.image}`} className="img-fluid" alt="Image de l'article" width="200" height="200" /></td>
                                <td>{post.title}</td>
                                <td>{truncate(post.content, 290)}</td>
                                <td>{post.created_at}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Link href={`/dashboard/edit/${post.slug}`}>
                                            <a className="mx-2" title="Edit" target="_blank">
                                                <i className="bi bi-pencil-square text-primary"></i>
                                            </a>
                                        </Link>

                                        <form onSubmit={e => sendData(e, post._id)}>
                                            <button type="submit" title="Delete" className="btn">
                                                <i className="bi bi-trash text-danger"></i>
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

                        {posts.totalPages > 1 &&
                        <li className="page-item page-link text-dark">
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

export async function getServerSideProps({ query : {page = 1, limit = 5} }) {
    const { API_URL } = process.env
    
    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`)
    const posts = await res.json()

    return {
        props: {
            posts: posts,
            page: parseInt(page),
            limit: limit
        }
    }
}