module.exports = (arr) => {
    const isNotArray = !Array.isArray(arr)
    const errMsg = "Need to pass array an array"
    
    if (isNotArray) throw new TypeError(errMsg)
    
    var parent = {}
    arr.forEach((val, index) => {
        parent[index] = val
    })
    
    return parent
}