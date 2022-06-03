/*eslint-env es6*/
const moment = require('moment');

const {
    all_online_users,
    getAllOnlineUsers,
    new_msg,
    getUsersmessages,
    readMessages,
    getUnreadMessages,
    disconnectusers,
    deleteMessages,
    getUserschats } = require('./chat');

module.exports = {

    socketConfig: (socket, io) => {
        socket.on('user-join', (data) => {
            socket.join(data.user);
            all_online_users(socket.id, data.user);
            console.log(data.user,'connected');
            io.emit('user-con', getAllOnlineUsers());
            //method to get all user chats......
            getUserschats(data.user).then(res => {
                // console.log(res)
                socket.emit('chats', res);
            });
        })

        socket.on('get-msgs', (data) => {
            getUserschats(data.user).then(res => {
                socket.emit('chats', res);
            });
        });

        socket.on('send-message', (message) => {
            socket.broadcast.to(message.to).emit('new-message', new_msg(message));
        });

        socket.on('user-messages', async (data) => {
            const chat = await getUsersmessages(data.from, data.to)
            socket.emit('receive-msg', (chat));
        });

        socket.on('req-unread-message', async (data) => {
            const unreadmsg = await getUnreadMessages(data.from, data.to);
            socket.emit('get-unread-message', ({ count: unreadmsg }));
        });

        socket.on('delete-message', (data) => {
            deleteMessages(data).then((res) => {
                // console.log(res);
                if (res) socket.emit('message-deleted', 'message was deleted successfully..')
            })
        });

        socket.on('update-all-unread-message', async (user) => {
            // console.log("User ", user);     
            const update = await readMessages(user.from, user.to);
            // const chat = await getUsersmessages(user.to, user.from);
            // socket.emit('receive-msg', (chat));
        });

        // Groups Mesaages
        // socket.on('join-group', (data) => {
        //     //socket.join(data.groupname)
        //     modules.findOne({ ModuleName: data.groupname }, { messages: 1, _id: 0 })
        //         .then(doc => {
        //             // console.log(doc);
        //             socket.emit('all-group-msg', doc.messages)
        //         })


        // });

        // socket.on('group-message', (message) => {
        //     modules.updateOne({ ModuleName: message.groupname }, {
        //         $push: {
        //             messages: {
        //                 from: message.userName,
        //                 message: message.message,
        //                 time: moment()
        //             }
        //         }
        //     }).then(() => { })
        //     socket.broadcast.to(message.groupname).emit('message', {
        //         from: message.userName,
        //         message: message.message,
        //         time: moment(),
        //         group: message.groupname
        //     })
        // });

        // socket.on('leave-group', (data) => {
        //     //console.log(data.groupname,'\t\t',data.userName)
        //     socket.leave(data.groupname)
        // });

        socket.on('disconnect', function () {
            //console.log(`${socket.id}, disconnect!`);
            disconnectusers(socket.id)
            io.emit('user-con', getAllOnlineUsers());
        });


    }
}
