let express = require("express");
const { dbConnection } = require("./dbConnection");
const { ObjectId } = require("mongodb");
let app = express();
require('dotenv').config()

app.use(express.json());

app.get("/student-view", async(req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let data = await studentCollection.find().toArray();

    let resObj = {
        status: 1, 
        msg: "Data view",
        data
    }
    res.send(resObj)
})


app.post("/student-insert", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let {sName, sEmail} = req.body
    let obj = {sName, sEmail}
    let insertRes = await studentCollection.insertOne(obj)

    let resObj = {
        status: 1, 
        msg: "Data insert",
        insertRes
    }
    res.send(resObj)
})

app.delete("/student-delete/:id", async(req, res) => {
    let {id} = req.params
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");
    let deleteid = await studentCollection.deleteOne({_id: new ObjectId(id)})
    res.send({
        status: 1,
        msg: "Data delete successfuly!",
        deleteid
    })
})

app.put("/studennt-update/:id", async(req, res) => {
    let {id} = req.params
    let {sName, sEmail} = req.body
    let obj={}
    if(sName!=="" && sName!==undefined && sName!==null){
        obj["sName"] = sName
    }
    if(sEmail!=="" && sEmail!==undefined && sEmail!==null) {
        obj["sEmail"] = sEmail
    }

    console.log(obj)
    let myDB = await dbConnection();
    let studentData = myDB.collection("students");
    let updateData = await studentData.updateOne({_id: new ObjectId(id)}, {$set:obj})

    resObj = {
        status: 1, 
        msg: "Data Update", 
        updateData
    }
    res.send(resObj)
})

app.listen(process.env.PORT || "8000")
