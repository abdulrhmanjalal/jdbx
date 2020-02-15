# What is this module?

This module is a simple local json database good for small projects and very simple games

# Installation

`npm install jdbx-t`

# Setup

```js
const jdbx = require("jdbx-t");

jdbx.setup(__dirname)
```

Sets the main directory to Create the "data" folder that stores the collection

```js
jdbx.setup(__dirname)
```

# Create function

A function that accepts two parameters first for the initial data second for the collection name to create a collection

Usage 

```js
jdbx.create({ name: "test" }, "collection") // initial data, collection name
```

If you set the initial data to null

```js
jdbx.create(null, "collection") // initial data to null
```

This will be returned

```json
{
    "init": "collection"
}
```

# Read functions

There is two types of this function 

First 

A function that accepts one parameter for the collection name to read the data from

```js
jdbx.read("collection") // collection name
```

Second 

A function that accepts two parameters first for the values to delete and second the collection name to return the data with this values

```js
jdbx.readCondition({init:"collection"}, "collection") 
// data with these values, collection name 
```
### ReadCondition() condition properties


#### _type property

```js
_type:"all"
```
Gets all entries with the condition if specified if not will return the collection

```js
_type:"one"
```
Gets The first entry from the condition if specified if not will return the first entry of the collection

#### _index property

```js
_index:NUMBER
```
Gets The index of an entry from the condition if specified if not will return the index of the entire collection


#### Useage
```js
jdbx.readCondition({name:"collection", _type:"all", _index:0}, "collection") 
```

### How to get data from these functions?

First

```js
let data = jdbx.read("collection")
```

Second

```js
jdbx.read("collection", (err, data)=>{
    if(!err){
        console.log(data)
    }
})
```

# Insert

Usage 

A function that accepts two parameters first for the values to insert and second the collection name to insert it to the collection

```js
jdbx.insert({data:"new Data"}, "collection")
// data to push, collection name
```

### Insert() data object properties


#### _times

```js
_times:NUMBER
```
Insert the data to the collection an amount of times `default:1`


#### Useage
```js
jdbx.insert({name:"collection", _times:10, _index:0}, "collection") 
```

# Update

Usage 

A function that accepts two parameters first for the values to update and second the collection name to update the data in

```js
jdbx.update({$fr:{name:"from"}, $to:{name:"to"}}, "collection")
// $fr a data already inserted $to replace the data with
```

# Delete functions

There is two types of this function 

First 

A function that accepts one parameter the collection name to delete the collection

```js
jdbx.deleteCollection("collection") // collection name 
```

Second 

A function that accepts two parameters first the values to delete and second the collection name to delete the value from the collection

```js
jdbx.deleteCondition({init:"collection"}, "collection")
// data to delete, collection name
```

