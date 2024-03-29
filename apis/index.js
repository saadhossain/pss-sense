const express = require('express')
const app = express()

const port = process.env.PORT || 3000
require('dotenv').config()
//Json web token
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//Require Cors
const cors = require('cors')
const whitelist = ['http://localhost:5173', 'https://pss-sense.web.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())

const uri = `mongodb+srv://pss_sense:${process.env.DATABASE_PASS}@pss-sense.elgnvgs.mongodb.net/pssSense`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//Generate JWT Token for the user
app.post('/getToken', (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
    res.send({ accessToken: token })
})

//Verify Token Send by user while requesting for a data
const verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).send({ message: 'You are not authorized to get this data' })
    }
    const token = authToken.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'You are not authorized to get this data' })
        }
        req.decoded = decoded
        next()
    })
}
const dbConnect = () => {
    const users = client.db('pssSense').collection('users');
    //Save new user to the Database
    app.post('/users', verifyToken, async (req, res) => {
        const user = req.body;
        const query = {
            email: user.email
        }
        const exists = await users.find(query).toArray();
        if (exists.length) {
            return res.send({ message: 'User Already Exists' });
        }
        const result = await users.insertOne(user);
        res.send(result);
    })
    //Get All users from the database
    app.get('/users', verifyToken, async (req, res) => {
        const query = {};
        const allUser = await users.find(query).toArray();
        res.send(allUser);
    })
    //Get a Specific user //Logged In from the database
    app.get('/user', verifyToken, async (req, res) => {
        const email = req.query.email
        const query = {
            email: email
        }
        const user = await users.find(query).toArray()
        res.send(user)
    })

    //Get a single user by id
    app.get('/user/:id', verifyToken, async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const singleUser = await users.find(query).toArray();
        res.send(singleUser[0])
    })
    //Delete a user
    app.delete('/users/:id', verifyToken, async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const result = await users.deleteOne(query)
        res.send(result)
    })
    //Update a User
    app.put('/users/:id', verifyToken, async (req, res) => {
        const id = req.params.id
        const filter = { _id: ObjectId(id) }
        const update = req.body
        const options = { upsert: true }
        const updatedUser = {
            $set: update
        }
        const result = await users.updateOne(filter, updatedUser, options)
        res.send(result)
    })

}

dbConnect()
//Default Route
app.get('/', (req, res) => {
    res.send('PSS Sense Server is Running....')
})

//Add a Listener to the app
app.listen(port, () => {
    console.log('Server Running on Port:', port);
})