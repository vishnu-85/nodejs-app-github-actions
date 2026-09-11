const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'my-secret-key';

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate request
    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required'
      });
    }

    console.log('Username:', username);
    console.log('Password:', password);

    // TODO:
    // Validate username/password from MongoDB here

    const token = jwt.sign(
      {
        username: 'vishnu',
        email: username,
        _id: 1234
      },
      secretKey,
      {
        expiresIn: '1h'
      }
    );

    return res.status(200).json({
      message: 'Login successful',
      user: {
        name: 'Vishnu Kant',
        email: username
      },
      jwt_token: token
    });

  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};


const verifyController = async (req, res)=>{
    try {
        console.log(req)
        const decodedToken = jwt.verify(req.query.token, secretKey)
        return res.status(200).json({
            ...decodedToken
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}


const logoutController = (req, res) => {
    
  const authHeader = req.headers.jwt_token;

  if (!authHeader) {
    return res.status(400).json({
      message: 'Token required'
    });
  }

  const token = authHeader

  

  return res.status(200).json({
    message: 'Logout successful'
  });
};

module.exports = {
  loginController,
  verifyController,
  logoutController
};