const { sfy, isJSON, filterArrayWithCondition, formateFromCommands } = require("../global/main")
const { isCollection, getCollection, writeCollection, removeCollection } = require("../global/collection")

function remove(condition, collectionName, dir, callback) {
    let data = sfy(condition)
    let all = JSON.parse(data)._all;

    if(isCollection(collectionName, dir)){
        if(isJSON(data)){
            if(JSON.parse(data)._force){
                removeCollection(dir, collectionName)
            }else{
                let collectionData = getCollection(dir, collectionName);
                condition = formateFromCommands([condition])[0]
                collectionData = filterArrayWithCondition(condition, collectionData, "==", all?true:false)
                writeCollection(dir, collectionName, collectionData);
            }
            if(callback) callback(null)
        }else{
            err = "Your enterd data is not a vaild json"
            if(callback) callback(err)
        }
    }else{
        err = "No Collection with that name"
        if(callback) callback(err)
    }
      
}


module.exports = { remove }