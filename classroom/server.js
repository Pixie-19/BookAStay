const express = require('express');
const app = express();
const users = require('./routes/user.js');
const posts = require('./routes/post.js');
const cookieParser = require('cookie-parser');

app.use(cookieParser("secretkey")); // Use cookie-parser middleware with a secret key for signed cookies

app.get("/getsignedcookies", (req, res) => {
    res.cookie("made-in", "India", {signed: true});
    res.send("sent you some signed cookies");
});

app.get("/verify", (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send("verified");
});


app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    res.send("sent you some cookies");
});

app.get("/greet", (req, res) => {
    const { name = "anonymous" } = req.cookies;
    res.send(`The cookie says: ${name}`);
});

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send('Welcome to the Classroom Server!');
});

app.use('/users', users);
app.use('/posts', posts);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});