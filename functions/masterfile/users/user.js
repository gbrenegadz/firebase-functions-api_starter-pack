const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const authMiddleware = require("../../auth/authMiddleware");

const userApp = express();
userApp.use(cors({ origin: true }));
userApp.use(authMiddleware);

const UserEntity = require("../../common/entities/UserEntity")
const { requestValidator } = require("./validators/reqValidator")


// * Create a new user
userApp.post("/", (req, res) => {
    const user = req.body;

    // TODO This is where validation shoud go

    db.collection('users').add(user);

    res.status(201).send();
});

// * Get all the users in the database
userApp.get("/", async (req, res) => {
    const snapshot = await db.collection('users').get();

    let users = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(users));
});


// * Get single user from the database
userApp.get("/:id", async (req, res) => {
    const snapshot = await db.collection('users').doc(req.params.id).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));
});

// * Update user
userApp.put('/:id', requestValidator, async (req, res) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const body = req.body;

    // * Create User Object
    // let userEntity = UserEntity.create({
    //     name: body.name,
    //     jobTitle: body.jobTitle,
    // })

    // const name = body.name;
    // const jobTitle = body.jobTitle;
    // const args = [name, jobTitle];

    // var user = new User(body);
    // console.log(body);

    // await db.collection('users').doc(req.params.id).update(body);

    res.status(200).send(JSON.stringify(body));
});

// * Delete user
userApp.delete('/:id', async (req, res) => {
    await db.collection('users').doc(req.params.id).delete();
    
    res.status(200).send();
});

// * Create route for user api
exports.user = functions.https.onRequest(userApp);
