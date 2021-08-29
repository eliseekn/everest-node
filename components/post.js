import Image from 'next/image'
import Link from 'next/link'

export default function Post({ post }) {
    return (
        <article className="col mb-5">
            <div className="card shadow-sm h-100">
                {/* <Image src={post.image} className="card-img-top" alt="Image de l'article" /> */}
                
                <div className="card-body">
                    <h2 className="card-title post-title">{ post.title }</h2>
                    <p className="card-text mt-3 text-justify">{ post.body }</p>
                    
                    <Link href="#">
                        <a className="btn btn-dark">Read more</a> 
                    </Link>
                </div>
            </div>
        </article>
    )
}
