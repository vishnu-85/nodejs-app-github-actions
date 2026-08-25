
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const MONGO_URI = 'mongodb://admin:qwerty@localhost:27017/?authSource=admin';
const client = new MongoClient(MONGO_URI)
const db = client.db('worker');
module.exports.db = db;