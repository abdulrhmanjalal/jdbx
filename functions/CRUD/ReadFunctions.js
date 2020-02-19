const { getCollection, isCollection } = require("../global/collection")
const { filterArrayWithCondition, sfy, formateDataType } = require("../global/main")

function get(condition, collectionName, dir, callback) {
    if(isCollection(collectionName, dir)){
        let collectionData = getCollection(dir, collectionName);
        
        collectionData = filterArrayWithCondition(condition, collectionData, "==", true)

        if(collectionData.length == 0){
            data = sfy(getCollection(dir, collectionName))   
        }

        if(typeof(condition._index) === "number" || condition.index === 0) {
            collectionData = formateDataType(collectionData, condition._index)
        }

        if(condition._type) {
            collectionData = formateDataType(collectionData, condition._type)
        }
    
        if(callback) callback(null, collectionData)
         
        return collectionData
    }else{
        err = "No Collection with that name"
        if(callback) callback(err, null)
    }

}

module.exports = {get}