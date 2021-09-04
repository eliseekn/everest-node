import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Head from '../../components/head'
import Comment from '../../components/comment'

export default function Post({ post, comments }) {
    return (
        <>
            <Head title={`${post.title} | Le Blog de l'Everest`} />

            <Header />

            <section className="container my-5 w-50">
                <article className="card mb-5">
                    <Image src={`http://127.0.0.1:3001/public/uploads/${post.image}`} className="card-img-top" width="500" height="500" alt="Image de l'article" />
                    
                    <div className="card-body">
                        <h2 className="card-title post-title">{post.title}</h2>
                        <p className="card-text mt-3 text-justify">{post.content}</p>
                        
                        <Link href="/">
                            <a className="btn btn-dark">Go back home</a> 
                        </Link>
                    </div>
                </article>  
                
                <Comment post={post} comments={comments} />

            </section>

            <Footer />
        </>
    )
}

export async function getServerSideProps({ params }) {
    const { NEXT_PUBLIC_API_URL } = process.env
    
    let res = await fetch(`${NEXT_PUBLIC_API_URL}/post/${params.slug}`)
    const post = await res.json()

    res = await fetch(`${NEXT_PUBLIC_API_URL}/comment/all/${post._id}`)
    const comments = await res.json()

    return {
        props: { post, comments }
    }
}
