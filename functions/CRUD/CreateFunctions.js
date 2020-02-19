const uuid = require("uuid/v1")
const { isJSON, sfy } = require("../global/main")
const { isCollection, writeCollection, getCollection }  = require("../global/collection")

function collection(collectionName, dir, callback) {
    let err = "";

    if(!collectionName){
        err = "Collection name is not defind"
        if(callback) callback(err)
    }

    if(!err){
        if(isCollection(collectionName, dir)){
            err = "Collection already exists"
            if(callback) callback(err)
        }else{
            const _initdata_  = {
                _collection_id:uuid(),
                name:collectionName
            }

            writeCollection(dir, collectionName, _initdata_)

            if(callback) callback(null)
        }
    } 
}

function insert(data, collectionName, dir, callback) {
    if(isJSON(sfy(data))){
        if(isCollection(collectionName, dir)){
            let collectionData = getCollection(dir, collectionName);

            if(!data._times) data._times = 1;

            for(var i = 0;i < data._times;i++){
                data._id = uuid()
                collectionData.push({ ...data});
            }

            writeCollection(dir, collectionName, collectionData)

            if(callback) callback(null, getCollection(dir, collectionName))
        }else{
            err = "No Collection with that name"
            if(callback) callback(err)
        }
    }else{
        err = "Your enterd data is not a vaild json"
        if(callback) callback(err)
    }  
}


module.exports = { collection, insert }


