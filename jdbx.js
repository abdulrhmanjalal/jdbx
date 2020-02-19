const create = require("./functions/CRUD/CreateFunctions")
const { get:getf } = require("./functions/CRUD/ReadFunctions")
const { remove:removef } = require("./functions/CRUD/DeleteFunctions")
const { update:updatef } = require("./functions/CRUD/UpdateFunctions")
const { connect } = require("./functions/global/connect")

let _name;
let _dir;
let _collection;

class Database{
    constructor(dir, dbName){
        if(connect(dir, dbName).status){
            _name = dbName;
            _dir = `${dir}\\${dbName}`;
            _collection = null
        } 
    }

    collection(collectionName, callback){
        create.collection(collectionName, _dir, callback)
        _collection = collectionName

        return this;
    }

    insert(data, callback){
        if(_collection){
            create.insert(data, _collection, _dir, callback)

            return this
        }else{
            console.log("Error! collection is not defind")
        }
    }

    get(condition, callback){
        if(_collection){
            getf(condition, _collection, _dir, callback)
            return this
        }else{
            console.log("Error! collection is not defind")
        }
    }

    remove(condition, callback){
        if(_collection){
            removef(condition, _collection, _dir, callback)
            return this
        }else{
            console.log("Error! collection is not defind")
        }
    }

    update(from, to, callback){
        if(_collection){
            updatef(from, to, _collection, _dir, callback)
            return this
        }else{
            console.log("Error! collection is not defind")
        }
    }
}

module.exports = {
    Database
}

