const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const {create_user} = require('../models/user');


//Sign up functionality
async function signup(req, res) {
    const { name, email, city, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = uuid.v4();
    try {
        await create_user({ id: userId, name, email, city, password: hashedPassword });
        res.redirect('/login'); // redirect to login page
    } catch (err) {
        console.error(err);
        res.render('signup', { error: 'Email already exists' });
    }
};

module.exports = {
    signup
};

