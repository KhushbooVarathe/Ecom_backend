const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const userId = req.header('userId');
    if (!userId) {
      return res.status(401).json({ error: 'Access denied. No userId provided.' });
    }
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = auth;
