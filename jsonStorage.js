const fs = require("fs");
const uuid = require("uuid/v1")
let mainDir = "";


function setup(dir){
    mainDir = `${dir}/data`
}

function start() {
    if (!fs.existsSync(mainDir)){
        fs.mkdirSync(mainDir);
    }
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (err) {
        return false;
    }
    return true;
}

function isCollection(collectionName) {
    start()
    const path = `${mainDir}/${collectionName}.json`

    try {
        if (fs.existsSync(path)) {
            return true;
        }
    } 
    catch(err) {
        return false;
    }
}

function create(data, collectionName, callback) {
    let err = "";
    start()

    if(!data){
        data = {
            init:collectionName
        }
    }

    if(!collectionName){
        err = "Collection name is not defind"
        if(callback) callback(err)
    }

    let JSONdata = JSON.stringify([data], null, 2)

    if(!err){
        if(isJSON(JSONdata)){
            const collection = isCollection(collectionName);
    
            if(collection){
                err = "Collection already exists"
                if(callback) callback(err)
            }else{
                fs.writeFileSync(`${mainDir}/${collectionName}.json`, JSONdata, (err) => {
                    if(err){
                        throw err
                    }
                })
                if(callback) callback(null)
            }
        }else{
           err = "Your enterd data is not a vaild json"
           if(callback) callback(err)
        }
    }
    
}

function insert(data, collectionName, callback) {
    start()

    if(isJSON(JSON.stringify(data))){
        const collection = isCollection(collectionName);

        if(collection){
            let collectionData = JSON.parse(fs.readFileSync(`${mainDir}/${collectionName}.json`));

            if(!data._times) data._times = 1;

            for(var i = 0;i < data._times;i++){
                data._id = uuid()
                collectionData.push({ ...data});
            }

            formateFromCommands(collectionData)

            collectionData = JSON.stringify(collectionData, null, 2)

            fs.writeFileSync(`${mainDir}/${collectionName}.json`, collectionData, (err) => {
                if(err){
                    throw err
                }
            })

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

function update(condition, collectionName, callback) {
    start()

    if(isJSON(JSON.stringify(condition))){
        const collection = isCollection(collectionName);

        if(collection){
            deleteCondition(condition.$fr, collectionName)
            insert(condition.$to, collectionName)
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

function read(collectionName, callback) {
    start()

    
    const collection = isCollection(collectionName);

    if(collection){
        let collectionData = JSON.parse(fs.readFileSync(`${mainDir}/${collectionName}.json`));

        if(callback){
            callback(null, collectionData)
        }
        
        return collectionData
    }else{
        err = "No Collection with that name"
        if(callback) callback(err, null)
    }

}

function readCondition(condition, collectionName, callback) {
    start()

    const collection = isCollection(collectionName);

    if(collection){
        let data = read(collectionName)
    
        data = filterArrayWithCondition(condition, data, "==")
        
        
        if(JSON.parse(data).length == 0){
            data = JSON.stringify(read(collectionName))   
        }

        if(condition._type) {
            data = formateDataType(data, condition._type)
        }
    
        if(typeof(condition._index) === "number" || condition.index === 0) {
            data = formateDataType(data, condition._index)
        }
    
        data = JSON.parse(data)

        callback(null, data)
        return data
    }else{
        err = "No Collection with that name"
        if(callback) callback(err, null)
    }    
}


function deleteCollection(collectionName, callback) {
    start()

    
    const collection = isCollection(collectionName);

    if(collection){
        fs.unlinkSync(`${mainDir}/${collectionName}.json`)
        
        if(callback) callback(null)
        
    }else{
        err = "No Collection with that name"
        if(callback) callback(err)
    }
      
}

function deleteCondition(condition, collectionName, callback) {
    start()

    let data = JSON.stringify(condition)

    const collection = isCollection(collectionName);
    if(collection){
        if(isJSON(data)){
            let collectionData = read(collectionName);
            
            collectionData = filterArrayWithCondition(condition, collectionData, "!=")

            fs.writeFileSync(`${mainDir}/${collectionName}.json`, collectionData, (err) => {
                if(err){
                    throw err
                }
            })


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

function filterArrayWithCondition(condition, array, type){
    let conditionEntries  = Object.entries(condition)[0];
            
    
    let filterData = array.filter(dataObj => {
        let data  = Object.entries(dataObj)[0];

        if(type === "!="){
            return data[0] === conditionEntries[0]?data[1] != conditionEntries[1]:true
        }else{
            return data[0] === conditionEntries[0]?data[1] === conditionEntries[1]?true:false:false
        }
       
    })

    filterData = JSON.stringify(filterData, null, 2)

    return filterData
}

function formateDataType(array, type){
    if(typeof(type) === "string"){
        switch (type.toLowerCase()) {
            case "all":
                return array;
    
            case "one":
                array = JSON.parse(array)
                array = array.filter((e, index) => index == 0)
                return JSON.stringify(array)
            
            default:
                break;
        }
    }

    if(typeof(type) === "number"){
        array = JSON.parse(array)
        array = array.filter((e, index) => index == type)
        return JSON.stringify(array)
    }
}

function formateFromCommands(array){
    for(var i = 0; i < array.length;i++){
        let keys = Object.keys(array[i])

        for(var x = 0;x < keys.length;x++){
            if(keys[x].startsWith("_") && keys[x] != "_id"){
                delete array[i][keys[x]]
            }
        }
    }
    
}

module.exports = {create, insert, read, deleteCollection, deleteCondition, readCondition, setup, update}