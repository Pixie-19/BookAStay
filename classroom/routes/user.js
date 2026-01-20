const express = require('express');
const router = express.Router();

//USERS
//Index
router.get('/users', (req, res) => {
    res.send('GET of users');
});

//Show
router.get('/users/:id', (req, res) => {
    res.send("GET for user id");
});

//POST 
router.post('/users', (req, res) => {
    res.send('POST for users');
});

//DELETE
router.delete('/users/:id', (req, res) => {
    res.send('DELETE for user id');
});

module.exports = router;