/**
        Returns an array containing all of an object's values
**/


function getObjVals (obj) {
    var vals = Object.keys(obj).map((key) => {
        const val = obj[key];
        if (val instanceof Object) return val;
        throw new TypeError("All values of the input object need to be Object() instances")
    })
    return vals
}


module.exports = getObjVals


