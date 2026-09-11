
const { db } = require('../mongodb/db-config');
const swaggerJSDoc = require('swagger-jsdoc');


const getUserController = async (req, res) => {

  try {
    if (req.query && req.query.name) {
      const users = await db.collection('users').find({ firstName: req.query.name }).toArray();
      res.status(200).json(users);
      return;
    }
    const users = await db.collection('users').find().sort({ firstName: 1 }).limit(10).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
}

const addUserController = async (req, res) => {

  try {
    if (req.body && req.method === 'POST') {
      const user = await db.collection('users').insertOne(req.body);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}
module.exports = {
  getUserController,
  addUserController
};