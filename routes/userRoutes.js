const express = require('express');
const router = express.Router();

const { getUserController, addUserController } = require('../controller/userController');
const { authUser } = require('../middleware/auth');

router.get('/users', [authUser], getUserController)
router.post('/user', [authUser], addUserController)

router.get('/health', async (req, res) => {
  try {
    res.status(200).json({ message: 'Server is healthy' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
})



module.exports = router;