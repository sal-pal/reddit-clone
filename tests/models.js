const expect = require('chai').expect
const db = require('../src/models/db.js')
const factory = require('./factory.js')



describe('getAllPosts', () => {
    it('returns an object containing all the posts of our app')  
    it('throws an error if a error arises in querying the database')
})


describe('getCommntsByPost', () => {
    it('returns a string if no comments are found in the database')
    it('returns an object representing a single comment if only one comment associated with post')
    it('returns an object containing multiple comments asssociated with a post')
    it('throws an error if a error arises in querying the database')    
})