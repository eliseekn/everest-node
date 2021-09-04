require('dotenv').config();
const supertest = require('supertest')

const req = supertest.agent(process.env.NODE_SERVER_URL)

describe('Comment test', () => {
    it('can store single comment', async () => {
        return req.post('/post')
            .field('title', 'lorem ipsum')
            .field('content', 'lorem ipsum dolor sit amt')
            .attach('file', './__tests__/server/img/post-image.svg')
            .expect(200)
            .then(async res => {
                return req.post(`/comment/${res.body._id}`)
                    .field('author', 'john@doe.com')
                    .field('content', 'lorem ipsum dolor sit amt')
                    .expect(200)
                    .then(res => {
                        expect(res.body.author).toBe('john@doe.com')
                        expect(res.body.content).toBe('lorem ipsum dolor sit amt')
                    })
            })
    })

    it('can delete single comment', async () => {
        return req.post('/post')
            .field('title', 'lorem ipsum')
            .field('content', 'lorem ipsum dolor sit amt')
            .attach('file', './__tests__/server/img/post-image.svg')
            .expect(200)
            .then(async res => {
                return req.post(`/comment/${res.body._id}`)
                    .field('author', 'john@doe.com')
                    .field('content', 'dolor lorem ipsum sit amet')
                    .expect(200)
                    .then(async res => {
                        return req.delete(`/comment/${res.body._id}`)
                            .expect(200)
                            .then(res => {
                                expect(res.body.ok).toBe(1)
                            })
                    })
            })
    })
})