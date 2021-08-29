import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Post from '../components/post'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Home({ posts }) {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="description" content="Le blog de l'Everest" />
                        
                <title>Le blog de l&apos;Everest</title>
            </Head>

            <Header />

            <div className="container my-5">
                <section className="container my-5">
                    <div className="row row-cols-2">
                        {posts.map((post, index) => {
                            return <Post
                                key={index}
                                post={post}
                            />
                        })}
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('http://jsonplaceholder.typicode.com/posts?_limit=4') //fetch('http://127.0.0.1:3001/api/post')
    const posts = await res.json()

    return {
        props: {
            posts
        }
    }
}