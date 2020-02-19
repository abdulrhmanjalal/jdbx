const fs = require("fs");


function filterArrayWithCondition(condition, array, type, all){
    let filterData;

    if(Object.keys(condition).length != 0 && isJSON(sfy(condition))){
        if(all){
            filterData = filterArray(condition, array, type)
        }else{
            if(!all){
                let target = formateDataType(filterArray(condition, array, "=="), 0);

                
                if(target.length > 0){
                    filterData = array.filter(element => {
                        if(type == "!="){
                            return target[0]._id != element._id?false:true
                        }else{
                            return target[0]._id == element._id?false:true
                        }
                    })
                }else{
                    if(type == "!="){
                        return [];
                    }else{
                        filterData = array 
                    }
                }
                
                
            }        
        }
        
        return filterData
    }else{
        return array
    }
}


function formateDataType(array, type){
    if(typeof(type) === "string"){
        switch (type.toLowerCase()) {
            case "all":
                return array;
    
            case "one":
                array = array.filter((e, index) => index == 0)
                return array
            
            default:
                break;
        }
    }

    if(typeof(type) === "number"){
        array = array.filter((e, index) => index == type)
        return array
    }
}

function formateFromCommands(array){
    for(var i = 0; i < array.length;i++){
        let keys = Object.keys(array[i])
        
        for(var x = 0;x < keys.length;x++){
            if(keys[x].startsWith("_") && !keys[x].startsWith("_id") && !keys[x].endsWith("_id")){
                delete array[i][keys[x]]
            }
        }
    }  
    
    return array
}

function loop(array) {
    array.forEach(element => {console.log(element.msg)})
}

function dirExists(dir) {
    try {
        if (fs.existsSync(dir)) {
            return true;
        }
    } 
    catch(err) {
        return false;
    }
}

function createDB(dir, existStatus){
    if(!existStatus){
        fs.mkdirSync(dir)
    }else{
        throw "db exists"
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

function sfy(data){
    return JSON.stringify(data, null, 2)
}

function filterArray(condition, array, type){
    let conditionEntries  = Object.entries(condition);

    conditionEntries.forEach((prop, cindex) => {    
        filterData = array.filter(dataObj => {
                let data  = Object.entries(dataObj);

                if(cindex < data.length){
                    if(type === "!="){
                        return data[cindex][0] == conditionEntries[cindex][0]?data[cindex][1] != conditionEntries[cindex][1]:true
                    }else{
                        return data[cindex][0] == conditionEntries[cindex][0]?data[cindex][1] == conditionEntries[cindex][1]?true:false:false
                    }
                }
        })
    })

    return filterData
}


module.exports = { loop, dirExists, createDB, isJSON, sfy, formateFromCommands, filterArrayWithCondition , formateDataType}