const route = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.model');

route.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 12);
        const account = await new User({ username, password: hashpassword }).save();
        console.log(account);
        // if (!!newTeacher.username) res.json({ mesaage: "teachers account created" });
        return res.json({ message: `${username}'s account created`, username });
    } catch (error) {
        console.log(error);
        next(next)
    }
});
route.get('/allusers', async (req, res, next) => {
    try {
        const users = await User.find({}, { _id: 0, password: 0 });
        // if (!!newTeacher.username) res.json({ mesaage: "teachers account created" });
        return res.json(users);
    } catch (error) {
        console.log(error);
        next(next)
    }
});

module.exports = route;