const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

function generateToken(){
    return (Math.random()*(16**9-16**8) + 16**8).toString(16);
}

function requireAuth(req,res, callback){
    const token = req.headers['x-auth-token'];
    const sessionI = sessions.findIndex(s => s.token === token);
    if(sessionI === -1){
        res.status(401);
        res.send();
    }else{
        callback(req, res);
    }
}

const profiles = [
     {
        id: 1,
        name: 'Mr. Smith',
        comment: 'boss',
        logo: 'https://freesvg.org/img/shokunin_businessman.png',
        phone: '555-3812',
        email: 'mr.boss@company.inc'
    },
    {
        id: 2,
        name: 'Uncle Poe',
        comment: 'dacha neighbour',
        logo: 'https://freesvg.org/img/fermier.png',
        phone: '555-1202',
        email: 'uncle.bob@dacha.org'
    },
    {
        id: 3,
        name: 'Max',
        comment: 'univercity',
        logo: 'https://freesvg.org/img/Graduation-Boy-Profile-Circle-Silhouette---1.0.0.png',
        phone: '555-1199',
        email: 'super-max@univercity.com'
    },
    {
        id: 4,
        name: 'John',
        comment: 'colleague',
        logo: 'https://freesvg.org/img/Graduation-Boy-Profile-Circle-Silhouette---1.0.0.png',
        phone: '555-1179',
        email: 'john-donn@company.inc'
    },
    {
        id: 5,
        name: 'Bill',
        comment: 'landlord',
        logo: 'https://freesvg.org/img/squire-plain.png',
        phone: '555-9119',
        email: 'bill-rich@veryrich.com'
    },
    {
        id: 6,
        name: 'Holmes',
        comment: 'sheriff',
        logo: 'https://freesvg.org/img/detectiveprofile.png',
        phone: '555-1234',
        email: 'holmes@sherlock.holmes'
    },
    {
        id: 7,
        name: 'Ashot',
        comment: 'fruit merchant',
        logo: 'https://freesvg.org/img/egore911_market.png',
        phone: '555-1234',
        email: null
    },
    {
        id: 8,
        name: 'Arnold',
        comment: 'trainer',
        logo: 'https://freesvg.org/img/logo16.png',
        phone: '555-4321',
        email: 'trainer@gym.com'
    },
    {
        id: 9,
        name: 'Felix',
        comment: 'hairdresser',
        logo: 'https://freesvg.org/img/johnny-automatic-barber.png',
        phone: '555-5323',
        email: null
    },
    {
        id: 10,
        name: 'Anna',
        comment: 'colleague',
        logo: 'https://freesvg.org/img/1396435340.png',
        phone: '555-1299',
        email: 'anna.n@company.inc'
    }
];

const users = [
    {login: 'admin', password: 'admin'},
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

app.get('/contacts', function (req,res){
    requireAuth(req, res, () => {
        const {query} = req.query;
        const words = query.split(' ')
            .map(w => w.trim())
            .filter(w => w);
        res.send(
            profiles.filter(p =>
                words.some(w => p.name.includes(w) ||
                    p.email.includes(w) ||
                    p.phone.includes(w) ||
                    p.comment.includes(w)
                )
            )
        );
    });
});

app.post('/contacts', function (req, res){
    requireAuth(req, res, () => {
        const profile = req.body;
        if(!profile.id){
            profile.id = profiles.length;
            profiles.push(profile);
            res.status(200);
            res.send();
        }else{
            const currentProfile = profiles.find(p => p.id === profile.id);
            currentProfile.name = profile.name;
            currentProfile.phone = profile.phone;
            currentProfile.email = profile.email;
            currentProfile.comment = profile.comment;
            res.status(200);
            res.send();
        }
    });
});

app.del('/contacts/:id', function (req, res){
    requireAuth(req, res, () => {
        const id = +req.params.id;
        const profileI = profiles.findIndex(p => p.id === id);
        profiles.splice(profileI, 1);
        res.status(200);
        res.send();
    });
});


app.post('/logout', function (req, res) {
    requireAuth(req, res, () => {
        const token = req.headers['x-auth-token'];
        const sessionI = sessions.findIndex(s => s.token === token);
        sessions.splice(sessionI,1);
        res.status(200);
        res.send();
    });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});