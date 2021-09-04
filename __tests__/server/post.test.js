require('dotenv').config();
const supertest = require('supertest')

const req = supertest.agent(process.env.NODE_SERVER_URL)

describe('Post test', () => {
    it('can store single post', async () => {
        return req.post('/post')
            .field('title', 'lorem ipsum')
            .field('content', 'lorem ipsum dolor sit amt')
            .attach('file', './__tests__/server/img/post-image.svg')
            .expect(200)
            .then(res => {
                expect(res.body.title).toBe('lorem ipsum')
                expect(res.body.content).toBe('lorem ipsum dolor sit amt')
                expect(res.body.image).toBe('post-image.svg')
            })
    })

    it('can update single post', async () => {
        return req.post('/post')
            .field('title', 'lorem ipsum')
            .field('content', 'lorem ipsum dolor sit amt')
            .attach('file', './__tests__/server/img/post-image.svg')
            .expect(200)
            .then(async res => {
                return req.put(`/post/${res.body._id}`)
                    .field('title', 'amet dolor lorem')
                    .field('content', 'dolor lorem ipsum sit amet')
                    .expect(200)
                    .then(async res => {
                        return req.get(`/post/id/${res.body._id}`)
                            .expect(200)
                            .then(res => {
                                expect(res.body.title).toBe('amet dolor lorem')
                                expect(res.body.content).toBe('dolor lorem ipsum sit amet')
                            })
                    })
            })
            
    })

    it('can delete single post', async () => {
        return req.post('/post')
            .field('title', 'lorem ipsum')
            .field('content', 'dolor lorem ipsum sit amet')
            .attach('file', './__tests__/server/img/post-image.svg')
            .expect(200)
            .then(async res => {
                return req.delete(`/post/${res.body._id}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body.ok).toBe(1)
                    })
            })
    })

    it('can get single post', async () => {
        return req.post('/post')
            .field('title', 'lorem ipsum')
            .field('content', 'lorem ipsum dolor sit amt')
            .attach('file', './__tests__/server/img/post-image.svg')
            .expect(200)
            .then(async res => {
                return req.get(`/post/${res.body.slug}`)
                    .expect(200)
                    .then(res => {
                        expect(res.body.title).toBe('lorem ipsum')
                        expect(res.body.content).toBe('lorem ipsum dolor sit amt')
                    })
            })
            
    })

    it('can delete all post', async () => {
        return req.post('/post')
            .field('title', 'lorem ipsum')
            .field('content', 'dolor lorem ipsum sit amet')
            .attach('file', './__tests__/server/img/post-image.svg')
            .expect(200)
            .then(async () => {
                return req.delete('/post')
                    .expect(200)
                    .then(res => {
                        expect(res.body.ok).toBe(1)
                    })
            })
    })
})