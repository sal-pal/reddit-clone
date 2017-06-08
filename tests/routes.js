const request = require('supertest')
const express = require('express')
const app = express()


describe('API', () => {
    it('/insertComment', (done) => {
        request(app)
          .get('/api/insertComment')
          .expect(200, done)            
    })
    it('/insertPost', (done) => {
        request(app)
            .post('/api//insertPost')
            .expect(200, done)
    })
    it('/getAllPosts', (done) => {
        request(app)
            .post('/api//getAllPosts')
            .expect(200)
            .expect(checkResBody)
            .end(done)
    })
    it('/getCommentsByPost', (done) => {
        request(app)
            .post('/api//getCommentsByPost')
            .expect(200)
            .expect(checkResBody)
            .end(done)
    })
})




function checkResBody(res) {
    const respBodyEmpty = Object.keys(res.body).length === 0 && res.body.constructor === Object
    if (respBodyEmpty) {
        throw new Error('Response body needs to contain data')
    }
}