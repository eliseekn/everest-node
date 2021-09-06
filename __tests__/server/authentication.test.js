require('dotenv').config();
const supertest = require('supertest')

const req = supertest.agent(process.env.NODE_SERVER_URL)

describe('Authentication test', () => {
    it('can not authenticate without credentials', () => {
        return req.post('/login')
            .send({})
            .expect(400)
    })

    it('can not authenticate with bad credentials', () => {
        return req.post('/login')
            .send({ email: 'test@test.com', password: 'test' })
            .expect(400)
    })

    it('can authenticate with existing user credentials', () => {
        return req.post('/login')
            .send({ email: 'user@mail.com', password: 'password' })
            .expect(200)
            .then(res => {
                expect(res.body.email).toBe('user@mail.com')
            })
    })
})
