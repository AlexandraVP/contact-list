const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

function generateToken(){
    return (Math.random()*(16**9-16**8) + 16**8).toString(16);
}

const users = [
    {login: 'Admin', password: 'Admin'}
];

const sessions = [];

app.post('/login', function (req, res) {
    const {login, password} = req.body;
    const user = users.find(u => u.login === login && u.password === password);
    if(user && !sessions.some(s => s.user === user)){
        const token = generateToken();
        sessions.push({token, user});
        res.send({token});
    }else{
        res.status(403);
        res.send();
    }
});

app.post('/logout', function (req, res) {
    const token = req.headers['x-auth-token'];
    const sessionI = sessions.findIndex(s => s.token === token);
    if(sessionI === -1){
        res.status(401);
        res.send();
    }else{
        sessions.splice(sessionI,1);
        res.status(200);
        res.send();
    }
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});