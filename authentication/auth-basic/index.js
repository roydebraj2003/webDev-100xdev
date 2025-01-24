const express = require('express');
const app = express();
app.use(express.json());

let users = [];

function generateToken() {
    return Math.random().toString(36).substring(2); 
}

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (user) {
        return res.status(409).json({
            message: "The user already exists",
        });
    }

    users.push({ username, password });
    res.status(201).json({
        message: "User created successfully!",
    });
});

app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(
        (user) => user.username === username && user.password === password
    );

    if (existingUser) {
        const token = generateToken();
        existingUser.token = token; 

        res.status(200).json({
            message: "User signed in",
            token: token,
        });
    } else {
        res.status(401).json({
            message: "Incorrect username or password",
        });
    }
});
app.post('/me', (req, res)=>{
    const token = req.headers.authorization
    const existingUser = users.find((user)=> user.token === token)
    console.log(token)
    console.log(users)
    if(existingUser) {
        res.status(200).json({
            username : existingUser.username
        })
    } else {
        res.status(401).json({
            message: "unauthorized"
        })
    }
})

app.listen(3000, () => {
    console.log('The server is listening on port 3000');
});
