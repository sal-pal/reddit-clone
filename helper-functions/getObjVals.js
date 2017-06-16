/**
        Returns an array containing all of an object's values
**/


function getObjVals (obj) {
    var vals = Object.keys(obj).map((key) => {
        return obj[key];
    })
    return vals
}


module.exports = getObjVals


