const faker = require('faker')
const ObjectId = require('mongoose').Types.ObjectId



//Post factory
module.exports = (quantity) => {
    var parent = {}
    var num = 0
    
    while (num < quantity) {
        parent[num] = {
            title: faker.lorem.words(),
            body: faker.lorem.sentences(),
            author: ObjectId()
        }
        num += 1
    }
    
    return parent
}