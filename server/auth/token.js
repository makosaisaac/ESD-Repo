require('dotenv').config();
/*eslint-env es6*/
const jwt = require('jsonwebtoken');


function createToken(username){
    const token = jwt.sign({username},
        process.env.key,
        {expiresIn:'14d'},
        {algorithm:'RS256'})
    return token;
}

function verifyToken(token){
    return jwt.verify(token, process.env.key);
}

module.exports = {createToken,verifyToken}
