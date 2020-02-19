const fs = require("fs");
const { dirExists, sfy, formateFromCommands, filterArrayWithCondition } = require("./main")

function getCollection(dir, collectionName){
    return JSON.parse(fs.readFileSync(`${dir}/${collectionName}.json`))
}

function isCollection(collectionName, dir) {
    return dirExists(`${dir}\\${collectionName}.json`)
}

function writeCollection(dir, collectionName, data){
    if(isCollection(collectionName, dir)){
        data = formateFromCommands(data)

        fs.writeFileSync(`${dir}/${collectionName}.json`, sfy(data), (err) => {
            if(err){
                throw err
            }
        })
    }else{
        fs.writeFileSync(`${dir}/${collectionName}.json`, sfy([data]), (err) => {
            if(err){
                throw err
            }
        })
     }
    
}

function removeCollection(dir, collectionName) {  
    fs.unlinkSync(`${dir}/${collectionName}.json`, (err) => {
        if(err){
            throw err
        }
    })
}

function isEntryCollection(entry, dir, collectionName){
    let data = getCollection(dir, collectionName);

    return filterArrayWithCondition(entry, data, "!=", false).length;
}


module.exports = {isCollection, writeCollection, getCollection, removeCollection, isEntryCollection }
