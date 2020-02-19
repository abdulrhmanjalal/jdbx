# What is this module?

This module is a simple local json database good for small projects and very simple games



# Installation

`npm install jdbx`


# Setup

```js
const { Database } = require("./jdbx");

const db = new Database(__dirname, "dbName")
```
# Functions



## **Collection**

A method that must start before other methods
That gets the currenct collection 

---

```js
db.collection("NAME")
```

## **Insert**

A method that pushs an object to the collection

---

```js
db.collection("NAME").insert({
    name:"Tom",
    age:42,
    email:"email@email.com"
})
```
---

## props

|  _prop | datatype | options  |                   description                   |
|:------:|----------|----------|:-----------------------------------------------:|
| _times |  Number  |     _    |        Number of times to insert the data       |


## **Get**

A method that gets data of a certain condition
---s
**Conditon get**

```js
db.collection("NAME").get({name:"Tom"}, (err, data) => console.log(data))
```
---
**All get**

```js
db.collection("NAME").get({}, (err, data) => console.log(data))
```
---

## props

|  _prop | datatype | options  |                   description                   |
|:------:|----------|----------|:-----------------------------------------------:|
|  _type |  String  | one, all | returns all data or the first index of the data |
| _index |  Number  |     _    |           returns an index of a entry           |


## **Update**

A method that overwrite a existing entry with the to param

---

Two params ``(from, to)``

```js
db.collection("NAME").update({name:"Tom"}, {name:"Bill"})
```
## **Remove**

A method that Delets an entry, entries, collection

---
**One Entry Remove**
```js
db.collection("NAME").remove({name:"Tom"})
```
---
**All Entries Remove**
```js
db.collection("NAME").remove({name:"Tom", _all:true})
```
---
**Collection remove**
```js
db.collection("NAME").remove({_force:true})
```
---

|  _prop | datatype | options  |                   description                   |
|:------:|----------|----------|:-----------------------------------------------:|
|  _force |  Boolean  | _ | Deletes a the collection if set to ``true`` |
|  _all |  Boolean  | _ | Deletes all entries that match the condition if set to ``true``|


