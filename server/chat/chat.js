/*eslint-env es6*/
const moment = require("moment");
const Message = require("../models/messages.model");
const User = require("../models/users.model");

const onlineUsers = [];

function all_online_users(id, username) {
  onlineUsers.push({ id, username });
  //return onlineUsers;
}

function getAllOnlineUsers() {
  return onlineUsers;
}

function new_msg(message) {
  const new_message = new Message({
    from: message.from,
    to: message.to,
    message: message.message,
    time: moment(),
  });
  new_message.save();
  return { ...message, time: moment(), read:false };
}

function getUsersmessages(from, to) {
  return Message.find(
    {
      $or: [
        { $and: [{ to: to }, { from: from }] },
        { $and: [{ to: from }, { from: to }] },
      ],
    },
    { _id: 0, __v: 0 }
  ).sort({ time: 1 });
}
// get unread messages
function getUnreadMessages(from, to) {
  return Message.find(
    {
      $or: [
        { $and: [{ to: to }, { from: from }, { read: false }] },
        { $and: [{ to: from }, { from: to }, { read: false }] },
      ],
    },
    { _id: 0, __v: 0 }
  ).count();
}
// set read messages to true
function readMessages(from, to) {
  return Message.updateMany(
    {to:to,from:from,read:false},
    {
      $set:{ read:true}
    }
  );
}

// const findAllMessages = (username) => {
//   return Message.find(
//     {
//       $or: [{ to: username }, { from: username }],
//     },
//     { _id: 0 }
//   ).sort({ time: 1 });
// };

var alldata = [];
var chats = [];

/*eslint-env es6*/
async function getUserschats(user) {
  return await findRev(user).then(async (res) => {
    return await findSend(user).then(async (ress) => {
      alldata = [...res, ...ress];
      // console.log(alldata);
      // console.log
      chats = await alldata
        .sort((a, b) => {
          return b.latestdate - a.latestdate;
        })
        .reduce((acc, curr) => {
          const check = acc.find((ele) => ele._id === curr._id);
          if (!check) {
            acc.push(curr);
          }
          return acc;
        }, []);
      // console.log(chats);
      return await chats;
    });
  });
}

function deleteMessages(user) {
  return Message.deleteOne({
    from: user.from,
    to: user.to,
    message: user.message,
    time: user.time,
  });
}

//messages send
var allsend = [];
var allrec = [];

//all messages that were received
function findRev(username) {
  return Message.aggregate([
    {
      $match: { to: username },
    },
    { $sort: { from: -1, time: -1 } },
    {
      $group: {
        _id: "$from",
        message: { $first: "$message" },
        latestdate: { $first: "$time" },
        read: { $first: "undefined" },
        unread: { $sum: {
          $cond: [ { $eq: [ "$read", false ] }, 1, 0 ]
        } }
      },
    },
  ]);
}

// all messages that were send
function findSend(username) {
  return Message.aggregate([
    {
      $match: { from: username },
    },
    { $sort: { to: -1, time: -1 } },
    {
      $group: {
        _id: "$to",
        message: { $first: "$message" },
        latestdate: { $first: "$time" },
        read: { $first: "$read" }
      },
    },
  ]);
}


function disconnectusers(id) {
  var i = onlineUsers.findIndex((element) => element.id === id);
  onlineUsers.splice(i, 1);
}

module.exports = {
  all_online_users,
  getAllOnlineUsers,
  new_msg,
  getUsersmessages,
  disconnectusers,
  readMessages,
  getUnreadMessages,
  getUserschats,
  deleteMessages
};
