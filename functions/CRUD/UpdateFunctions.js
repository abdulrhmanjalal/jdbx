const { sfy, isJSON, formateFromCommands} = require("../global/main")
const { insert } = require("./CreateFunctions");
const { remove } = require("./DeleteFunctions")
const { isCollection, isEntryCollection } = require("../global/collection")


function update(from, to, collectionName, dir, callback) {
    if(isJSON(sfy(from)) && isJSON(sfy(to))){
        if(isCollection(collectionName, dir)){

            to = formateFromCommands([to])[0]
            from = formateFromCommands([from])[0]
            
            if(isEntryCollection(from, dir, collectionName)){
                insert(to, collectionName, dir)
                remove(from, collectionName, dir)
            }
            if(callback) callback(null, read(collectionName))
        }else{
            err = "No Collection with that name"
            if(callback) callback(err)
        }
    }else{
        err = "Your enterd data is not a vaild json"
        if(callback) callback(err)
    }
    
}

module.exports = { update }