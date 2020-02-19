const { loop, dirExists, createDB } = require("./main")
let errors = []

function connect(dir, dbName){
    if(dir && dbName){
        let dbDir = `${dir}/${dbName}`

        if(!dirExists(dbDir)){
            createDB(dbDir, dirExists())
        }

      return {
          dbName,
          dir,
          status:true
      }
    }else{
        errors.push({msg:`<dir> <dbName> params are required ${!dir?"dir is not defind":!dbName?"dbName is not defind":"no params is defind"}`})
        loop(errors)

        return  {status:false}
    }
}

module.exports = { connect }