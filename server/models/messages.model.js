/*eslint-env es6*/
const {Schema,  model} = require('mongoose');

const messages = new Schema({
    from:{type:String,required:true},
    to:{type:String,required:true},
    message:{type:String,required:true},
    time:{type:Date,required:true},
    read:{type:Boolean,default:false}
});


module.exports = model('message',messages);
