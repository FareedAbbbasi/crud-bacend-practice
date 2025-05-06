const { MongoClient } = require('mongodb');
const dburl = "mongodb://127.0.0.1:27017"
const client = new MongoClient(dburl)


let dbConnection = async () => {
    await client.connect();
    let db = client.db("mongoDBProject_Database")
    return db;
}

module.exports = {dbConnection}
