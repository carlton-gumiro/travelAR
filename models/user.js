const express = require('express');
const { knex } = require('../db/database');




async function create_user(id, name, email, city, password) {

    let user = await knex('users')
        .insert({
            id: id,
            name: name,
            email: email,
            city: city,
            password: password,
            created_at: new Date()
        }, ['*']).catch((err) => {
            if (err.code == 23505) {
                let user = [{
                    code: 23505
                }]
                return user
            }
        })
}


module.exports = {
    create_user
};