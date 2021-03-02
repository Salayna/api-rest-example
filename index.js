const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())

let cars = [];

let car1 = {
    id: 1,
    name: "Tesla Model S",
    proprio: "Mr Iervese",
    date: 2017,
}

let car2 = {
    id: 2,
    name: "Lamborghini Urus",
    proprio: "Mr Hagot",
    date: 2019,
}

let car3 = {
    id: 3,
    name: "Ferrari Roma",
    proprio: "Mr Georges",
    date: 2016,
}

cars.push(car1, car2, car3);

app.get('/', (req, res)=> {
    res.send("Welcome to this demo API")
});

app.get('/api/cars', (req, res)=> {
    res.send(cars);
});

app.get('/api/cars/:id', (req, res)=>{
    const id  = req.params.id
    if(!cars[id-1]){
        res.status(404).send("ressources not found");
        return;
    }
    res.status(200).send(car);
});

app.post('/api/cars', (req, res)=> {
 const body = req.body;
 if(!req.body.id ||!req.body.name || !req.body.proprio || !req.body.date) {
     res.status(400).send("Bad Request");
     return
 }
 if((typeof req.body.name !== 'string' || req.body.name instanceof String === false) ||(typeof req.body.proprio !== 'string' || req.body.proprio instanceof String === false) || (typeof req.body.date !== 'number' || req.body.date instanceof Number === false) || (typeof req.body.id !== 'number' || req.body.id instanceof Number === false)){
     res.status(400).send("Bad Request");
     return
 }
 cars.push(body);
 res.status(201).send({
     message: "Entity added to the db",
     entity:body
 })
});

app.patch('/api/car/:id', (req, res)=>{
    const id = req.params.id
    if(!cars[id-1]){
        res.status(404).send("ressources not found");
    } 
    let proprio = req.body.proprio;
    if(typeof proprio !== 'string' || proprio instanceof String === false) {
        res.status(400).send("Bad Request");
        return;
    };
    cars[id-1].proprio = proprio;
    res.status(200).send(cars[id-1]);
});


app.delete('/api/car/:id', (req, res)=>{
    const id = req.params.id;
    if(!cars[id-1]) {
        res.status(404).send("Ressource not found");
        return;
    }
    cars.splice(id-1, 1);
    res.status(200).send(cars);
});

app.listen(3000, ()=>{
    console.log('app running on port 3000');
});