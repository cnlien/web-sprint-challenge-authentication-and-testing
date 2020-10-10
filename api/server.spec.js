const request = require('supertest');
const server = require('./server.js');
const knex = require('../database/dbConfig.js');
const testUser = { username: 'testUser', password: 'password'}

describe('server.js', () => {

    describe('Test the Get Jokes endpoint', () => {
        it('Should return status 400', async () => {
            const res = await request(server).get('/api/jokes')
            expect (res.status).toBe(400);
        })

        it('Should return a JSON message', async () => {
            const res = await request(server).get('/api/jokes')
            expect (res.type).toBe('application/json')
        })
    })

    describe('Tests the registration POST request', () => {
        it('Should return status 201', async () => {
            await knex('users').truncate()
            const res = await request(server)
                .post('/api/auth/register')
                .send(testUser);
            expect(res.status).toBe(201)
        })

        it('Invalid user should return status 500', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: 'testUser' })
            expect(res.status).toBe(500)
        })
    })

    describe('Tests the login POST request', () => {
        it('Should return status 200', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send(testUser)
            expect (res.status).toBe(200)
        })

        it('should return status 401', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({username: "testUser", password: ""})
            expect(res.status).toBe(401)
        })
    })
})
