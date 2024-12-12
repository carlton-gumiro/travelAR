const express = require('express');
const router = express.Router();
const {signup} = require('../controllers/auth');

//Sign up route
router.get('/register', (req, res) => {
    res.render('signup');
});

router.post('/register', async (req, res) => { 
  await signup(req,res);
});

//Login route

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router