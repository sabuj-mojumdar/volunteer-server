const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wff6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("volunteer");
        const userDetails = database.collection("userDetails");
        const doc = {
            name: "sabuj Majumdar",
            email: "mojumdarnb@gmail.com"
        }
        const result = await userDetails.insertOne(doc);
        // console.log(result);

    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.listen(port, () => {
    console.log("this port is running from ", port);
})