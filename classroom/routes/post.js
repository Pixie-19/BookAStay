const express = require('express');
const router = express.Router();
//POSTS
//Index
router.get('/posts', (req, res) => {
    res.send('GET of posts');
});

//Show
router.get('/posts/:id', (req, res) => {
    res.send("GET for post id");
});

//POST 
router.post('/posts', (req, res) => {
    res.send('POST for posts');
});

//DELETE
router.delete('/posts/:id', (req, res) => {
    res.send('DELETE for post id');
});

module.exports = router;
