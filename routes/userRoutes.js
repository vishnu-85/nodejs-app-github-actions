const express = require('express');
const router = express.Router();


const { db } = require('../mongodb/db-config');
const swaggerJSDoc = require('swagger-jsdoc');

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */ 
router.get('/getUsers', async (req, res) => {
  try {
    if(req.query && req.query.name) {
      const users = await db.collection('user').find({ firstName: req.query.name }).toArray();
      res.status(200).json(users);
      return;
    }
    const users = await db.collection('user').find().sort({ firstName: 1 }).limit(10).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
})
 
router.get('/health', async (req, res) => {
  try {
    res.status(200).json({ message: 'Server is healthy' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
})

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body
 */
router.post('/user', async (req, res) => {
  try {
    if(req.body && req.method === 'POST') {
      const user = await db.collection('user').insertOne(req.body);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
})

module.exports = router;