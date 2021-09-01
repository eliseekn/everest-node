import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Head from '../../components/head'

export default function Home({ post }) {
    return (
        <>
            <Head title={`${post.title} | Le Blog de l'Everest`} />

            <Header />

            <section className="container my-5 w-75">
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
            </section>

            <Footer />
        </>
    )
}

export async function getStaticProps({ params }) {
    const { API_URL } = process.env
    
    const res = await fetch(`${API_URL}/${params.slug}`)
    const post = await res.json()

    return {
        props: { post }
    }
}

export async function getStaticPaths() {
    const { API_URL } = process.env
    
    const res = await fetch(`${API_URL}`)
    const posts = await res.json()

    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))
  
    return { paths, fallback: false }
}