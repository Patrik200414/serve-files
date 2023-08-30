import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World');
})

app.get('/users', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }
        const realData = JSON.parse(data).users;
        res.send(realData);
    })
})

app.get('/users/:userId', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }

        const users = JSON.parse(data).users;
        const userId = Number(req.params.userId);

        const user = users.find(user => user.id === userId);

        if(user){
            res.send(user);
        } else{
            res.status(404);
            res.send({state: 'User not found!'});
        }
    })
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})