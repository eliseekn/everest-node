import {useRouter} from 'next/router'
import Post from '../components/post'
import Header from '../components/header'
import Footer from '../components/footer'
import Head from '../components/head'

export default function Home({ posts, page, limit }) {
    const router = useRouter()

    return (
        <>
            <Head title="Le Blog de l'Everest" />

            <Header />

            <section className="container my-5">
                <div className="row row-cols-2">
                    {posts.items.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>

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
            </section>

            <Footer />
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