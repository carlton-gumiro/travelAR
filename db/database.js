require('dotenv').config()

// Later on change the password and username with env variables
const knex = require('knex')({
    client: 'pg',
    version: '14.4',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
})


module.exports = {
    knex
};