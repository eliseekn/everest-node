import { useRouter } from 'next/router'
import { useState } from "react"

export default function Comment({ post, comments }) {
    const { NEXT_PUBLIC_API_URL } = process.env
    const [alert, showAlert] = useState(false)
    const router = useRouter()

    const sendData = e => {
        e.preventDefault()

        fetch(`${NEXT_PUBLIC_API_URL}/comment/${post._id}`, {
            method: 'POST',
            body: new FormData(e.target)
        })
            .then(res => {
                if (res.status == 200) {
                    showAlert(true)
                    e.target.reset()
                    router.push(`/post/${post.slug}`, null, { scroll: false })
                }

                return res.json()
            })
            .then(data => console.log(data))
    }

    return (
        <>
            <h3 className="mb-3">Comments ({comments.length})</h3>

            <div className="mt-3">
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <p className="fw-bold">{comment.author}</p>
                        <p className="fst-italic">{comment.content}</p> 
                    </div>
                ))}
            </div>

            <h4 className="mt-5">Leave a comment</h4>

            {alert && <div className="alert alert-success">
                Comment has been created successfully
            </div>}

            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input type="email" id="author" name="author" className="form-control" required autoFocus />
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea id="content" name="content" className="form-control" required></textarea>
                </div>

                <button type="submit" className="btn btn-dark">Save</button>
            </form>
        </>
    )
}
