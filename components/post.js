import Image from 'next/image'
import Link from 'next/link'

export default function Post({ post }) {
    //https://javascript.info/task/truncate
    const truncate = (str, length) => {
        return (str.length > length) ? str.slice(0, length - 1) + '...' : str;
    }

    return (
        <article className="col mb-5">
            <div className="card shadow-sm h-100">
                <Image src={`http://127.0.0.1:3001/public/uploads/${post.image}`} className="card-img-top" width="300" height="400" alt="Image de l'article" />
                
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
