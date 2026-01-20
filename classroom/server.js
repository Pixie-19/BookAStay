const express = require('express');
const app = express();
const users = require('./routes/user.js');
const posts = require('./routes/post.js');

app.get('/', (req, res) => {
    res.send('Welcome to the Classroom Server!');
});

app.use('/', users);
app.use('/', posts);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});