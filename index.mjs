import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const url = process.env.MONGO_URL;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected to database!");

  // insert document
  const collection = db.collection('messages');
  const message = { message: "hello world" };
  collection.insertOne(message, function(err, res) {
    if (err) throw err;
    console.log("Document inserted");
    db.close();
  });
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/messages', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const collection = db.collection('messages');
    collection.findOne({}, function(err, doc) {
      if (err) throw err;
      res.send(doc.message);
      db.close();
    });
  });
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});