import Image from 'next/image'
import Link from 'next/link'
import { truncate } from '../utils'

export default function Post({ post }) {
    const { NEXT_PUBLIC_API_PUBLIC_URL } = process.env

    return (
        <article className="col mb-5">
            <div className="card shadow-sm h-100">
                <Image src={`${NEXT_PUBLIC_API_PUBLIC_URL}/${post.image}`} className="card-img-top" width="300" height="400" alt="Image de l'article" />
                
                <div className="card-body">
                    <h2 className="card-title post-title">{ post.title }</h2>
                    <p className="card-text mt-3 text-justify">{ truncate(post.content, 290) }</p>
                    
                    <Link href={`/post/${post.slug}`}>
                        <a className="btn btn-dark">Read more</a> 
                    </Link>
                </div>
            </div>
        </article>
    )
}
