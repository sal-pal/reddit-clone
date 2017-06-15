const faker = require('faker')
const ObjectId = require('mongoose').Types.ObjectId



//Post factory
module.exports = (quantity) => {
    if (quantity === 1) {
         return {
            title: faker.lorem.words(),
            body: faker.lorem.sentences(),
            author: ObjectId()
        }
    }
    
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