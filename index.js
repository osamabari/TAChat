var express = require('express'),
        app = express(),
        http = require('http'),
        server = http.createServer(app),
        io = require('socket.io').listen(server),
        _ = require('underscore'),
        moment = require('moment'),
        request = require('request'),
        waterfall = require('async-waterfall'),
        bodyParser = require('body-parser'),
        usernames = {},
        userIds = {},
        clients = [],
        users = [],
        onlineClient = [],
        clientInfo = {},
        mysql = require('mysql'),
        port = 8008,
//install forEach special module with async lib
       forEach = require('async-foreach').forEach;

//add body barser to accept post requests
app.use(bodyParser.urlencoded({
    extended: false
}));

//database connection with mysql

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tech@123',
    database: 'og-words'
});

// parse application/json 
app.use(bodyParser.json());

connection.connect(function (err) {
    if (!err) {
        //console.log("Database is connected ... ");
    } else {
        //console.log("error connecting database ... ");
    }
});

//start chat server
server.listen(port);


 /***************************************************************************************************************************************************************/
     
    
app.get('/', function (req, res) {         
      res.send("Welcome to TA Chat Server");
});


app.get('/docs', function(req, res) {
         app.use(express.static(__dirname + '/docs'));
        res.sendFile('./docs/index.html', { root: __dirname });
    });

/************************************************************************ Start Soket Event ************************************************************************/

io.sockets.on('connection', function (socket) {

    /***************************************************************************************************************************************************************/
    /************************************************************************ /chkUser ************************************************************************/
    /**
     * @api {socket:event} :::chkUser chkUser
     * @apiDescription for checking users is online or not. it will fire as a first event.
     * @apiGroup Chat
     * @apiName chkUser
     * ***************************************************************************************************************************************************************
      * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {Object}            data.userId                                               object parameter
     * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */

    socket.on('chkUser', function (data) {
        var chk = users.indexOf(data.userId);
        var curdatetime = currentDateTime('India', '5.5');
        if (data.userId == "")
        {
            return false;
        }

        if (users.indexOf(data.userId) == '-1')
        {
            users.push(data.userId);
        }

        var data = {
            name: data.userId,
            msg: ' joined chat on ' + curdatetime + ' !',
            color: 'text-success'
        };

        if (onlineClient[data.name])
        {
            var ind3 = onlineClient.indexOf(data.name);
            onlineClient.splice(ind3, 1);
        }
        onlineClient['userid' + data.name] = socket;

        /// Unread message of one to one user

        connection.query('SELECT tm.message, tm.chatId, tm.from_id,  tm.to_id, tm.group_id, tm.chatType, tm.message_type, tm.filename, tm.fileurl, tm.filesize, tm.msgUUID, UNIX_TIMESTAMP(tm.timestamp) as timestamp FROM tbl_message as tm left join tbl_child_message as tcm on tcm.chatId=tm.chatId where tm.to_id=' + data.name + ' and tcm.is_read="0" and tcm.is_deleted="0" order by UNIX_TIMESTAMP(tm.timestamp) desc', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err;
            } else {
                for (var i in rows) {
                    var clientSocket = onlineClient['userid' + data.name];
                    clientSocket.emit('receivePrivateMsg', rows[i]);
                }
            }
        });

        /// Unread message of group

        connection.query('SELECT tm.message, tm.chatId, tm.from_id, tm.to_id, tm.group_id, tm.chatType, tm.message_type, tm.filename, tm.fileurl, tm.filesize, tm.msgUUID, UNIX_TIMESTAMP(tm.timestamp) as timestamp FROM `tbl_users_group` as tug inner join tbl_message as tm on tm.group_id=tug.groupId left join tbl_child_message as tcm on  tcm.chatId=tm.chatId where tug.userId=' + data.name + ' and tcm.is_deleted="0" and tcm.is_read="0" and tcm.user_id= ' + data.name + ' order by UNIX_TIMESTAMP(tm.timestamp) desc', function (err, rows, fields) {
            if (err) {
                throw err;
            } else {
                for (var i in rows) {
                    var clientSocket1 = onlineClient['userid' + data.name];
                    clientSocket1.emit('recivedGroupMsg', rows[i]);
                }
            }
        });

        /// Seen message of group and one to one

        connection.query('SELECT tm.message, tm.chatId, tm.from_id,  tm.to_id, tm.group_id, tm.chatType, tm.message_type, tm.filename, tm.fileurl, tm.filesize, tm.msgUUID, UNIX_TIMESTAMP(tm.timestamp) as timestamp FROM tbl_message as tm left join tbl_child_message as tcm on tcm.chatId=tm.chatId where tm.from_id=' + data.name + ' and tcm.user_id=' + data.name + ' and tcm.is_deleted="0" and tcm.status="0" order by UNIX_TIMESTAMP(tm.timestamp) desc', function (err, rows, fields) {
            if (err) {
                ////console.log(err);
                throw err;
            } else {
                ////console.log(rows);
                for (var i in rows) {
                    ////console.log(data.name + "==" + rows[i].from_id);
                    if (data.name == rows[i].from_id) {
                        connection.query('SELECT * FROM tbl_message left join tbl_child_message on tbl_child_message.chatId=tbl_message.chatId where tbl_message.chatId=' + rows[i].chatId + ' and tbl_child_message.is_read="0"', function (err, rowss, fields) {
                            if (err) {
                                throw err;
                            } else {
                                ////console.log(rowss);
                                if (rowss.length == 0) {
                                    var data_send = {};
                                    data_send = {
                                        from_id: rows[i].from_id,
                                        to_id: rows[i].to_id,
                                        group_id: rows[i].group_id,
                                        chatId: rows[i].chatId
                                    };
                                    ////console.log(data_send);
                                    onlineClient['userid' + data.name].emit('receiveReadMessages', data_send);
                                    //////console.log(rowss);
                                    connection.query('UPDATE tbl_child_message SET status = ? WHERE chatId = ? and user_id = ?', ['1', rows[i].chatId, data.name], function (err, result) {
                                        if (err) {
                                            ////console.log(err);
                                            throw err;
                                        } else {
                                            //////console.log(result); 
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });
        socket.emit("chkUser", chk);
    });

 /***************************************************************************************************************************************************************/
    /************************************************************************ /readMessages ************************************************************************/
    /**
     * @api {socket:event} :::readMessages readMessages
     * @apiDescription readMessages
     * @apiGroup Chat
     * @apiName readMessages
     * ***************************************************************************************************************************************************************
     
     * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.from_id                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.to_id                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.chatId                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.group_id                                              Object parameter
     * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */
    // 
    socket.on('readMessages', function (data) {
        if (data.group_id && data.group_id > 0) {
            ////console.log('Group readMessages');
            connection.query('UPDATE tbl_child_message SET is_read = ?, readTimestemp=? WHERE chatId = ? and user_id = ?', ['1', moment().format('YYYY-MM-DD H:mm:s'), data.chatId, data.to_id], function (err, result) {
                if (err) {
                    throw err;
                } else {
                    var abc2 = onlineClient['userid' + data.to_id];

                    if (0 != Object.getOwnPropertyNames(abc2).length) {
                        onlineClient['userid' + data.to_id].emit('receiveReadMessages', data);
                    }

                    connection.query('SELECT * FROM tbl_message left join tbl_child_message on tbl_child_message.chatId=tbl_message.chatId where tbl_message.chatId=' + data.chatId + ' and tbl_child_message.is_read="0"', function (err, rows, fields) {
                        if (err) {
                            throw err;
                        } else {

                            if (rows.length === 0) {
                                var abc = onlineClient['userid' + data.from_id];

                                //if(onlineClient.indexOf(data.from_id) >0)
                                if (0 != Object.getOwnPropertyNames(abc).length) {
                                    onlineClient['userid' + data.from_id].emit('receiveReadMessages', data);
                                    connection.query('UPDATE tbl_child_message SET status = ? WHERE chatId = ? and user_id = ?', ['1', data.chatId, data.from_id], function (err, result) {
                                        if (err) {
                                            ////console.log(err);
                                            throw err;
                                        } else {
                                            ////console.log(result);
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
        } else {

            connection.query('UPDATE tbl_child_message SET is_read = ?, readTimestemp=? WHERE chatId = ? and user_id = ?', ['1', moment().format('YYYY-MM-DD H:mm:s'), data.chatId, data.to_id], function (err, result) {
                if (err) {
                    ////console.log(err);
                    throw err;
                } else {

                    var abc = onlineClient['userid' + data.from_id];
                    //if(onlineClient.indexOf(data.from_id) >0)
                    if (0 != Object.getOwnPropertyNames(abc).length) {
                        onlineClient['userid' + data.from_id].emit('receiveReadMessages', data);
                        connection.query('UPDATE tbl_child_message SET status = ? WHERE chatId = ? and user_id = ?', ['1', data.chatId, data.from_id], function (err, result) {
                            if (err) {
                                ////console.log(err);
                                throw err;
                            } else {
                                ////console.log(result);
                            }
                        });
                    }

                    if (onlineClient['userid' + data.to_id]) {
                        onlineClient['userid' + data.to_id].emit('receiveReadMessages', data);
                    }
                }
            });
        }

    });

 /***************************************************************************************************************************************************************/
    /************************************************************************ /connectGroup ************************************************************************/
    /**
     * @api {socket:event} :::connectGroup connectGroup
     * @apiDescription connectGroup
     * @apiGroup Chat
     * @apiName groupId
     * ***************************************************************************************************************************************************************
     
     * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.groupId                                              Object parameter
       * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */

    socket.on('connectGroup', function (data) {
        socket.room = data.groupId;
        socket.join(data.groupId);
        socket.join(socket.room);

        connection.query('SELECT * FROM tbl_message where group_id=' + data.groupId + ' order by timestamp desc limit 0,10', function (err, rows, fields) {
            if (err) {
                throw err;
            } else {
                socket.emit('loadOldMessages', rows);
            }
        });
    });



 /***************************************************************************************************************************************************************/
    /************************************************************************ /sendGroupMsg ************************************************************************/
    /**
     * @api {socket:event} :::sendGroupMsg sendGroupMsg
     * @apiDescription sendGroupMsg
     * @apiGroup Chat
     * @apiName sendGroupMsg
     * ***************************************************************************************************************************************************************
     
     * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.from_id                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.group_id                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.message_type                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.filename                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.fileurl                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.filesize                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.msgUUID                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.chatType                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.group_id                                              Object parameter

       * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */

    socket.on('sendGroupMsg', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        var newChat = {
            message: data.message,
            from_id: data.from_id,
            group_id: data.group_id,
            message_type: data.message_type,
            filename: data.filename,
            fileurl: data.fileurl,
            filesize: data.filesize,
            msgUUID: data.msgUUID,
            chatType: data.chatType,
            timestamp: moment().format('YYYY-MM-DD H:mm:s')
        };
        //////console.log(newChat);
        var query = connection.query('INSERT INTO tbl_message SET ?', newChat, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                data.chatId = result.insertId;
                data.timestamp = moment(newChat.timestamp).unix();
                io.sockets.in(data.group_id).emit('recivedGroupMsg', data);

                connection.query('SELECT * FROM tbl_users_group where groupId=' + data.group_id, function (err, rows, fields) {
                    if (err) {
                        //////console.log(err);    
                    } else {
                        for (var i in rows) {
                            var childChat = {
                                chatId: data.chatId,
                                user_id: rows[i].userId,
                                is_read: (rows[i].userId == data.from_id) ? "1" : "0",
                                readTimestemp: moment().format('YYYY-MM-DD H:mm:s'),
                                timestamp: moment().format('YYYY-MM-DD H:mm:s'),
                            };
                            var child_query = connection.query('INSERT INTO tbl_child_message SET ?', childChat, function (err, result) {
                                if (err) {
                                    throw err;
                                }
                            });
                        }
                    }
                });

            }
        });
    });


 /***************************************************************************************************************************************************************/
    /************************************************************************ /sendPrivateMsg ************************************************************************/
    /**
     * @api {socket:event} :::sendPrivateMsg sendPrivateMsg
     * @apiDescription sendPrivateMsg
     * @apiGroup Chat
     * @apiName sendPrivateMsg
     * ***************************************************************************************************************************************************************
     
     * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.from_id                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.to_id                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.message_type                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.filename                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.fileurl                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.filesize                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.msgUUID                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.chatType                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.msgUUID                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.chatType                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.message                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.group_id                                              Object parameter

       * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */
    socket.on('sendPrivateMsg', function (data) {
        var chatId = '';
        var group_id = data.chatType == 3 ? data.group_id : 0;
        var newChat = {
            from_id: data.from_id,
            to_id: data.to_id,
            message: data.message,
            message_type: data.message_type,
            filename: data.filename,
            fileurl: data.fileurl,
            filesize: data.filesize,
            msgUUID: data.msgUUID,
            chatType: data.chatType,
            group_id: group_id,
            timestamp: moment().format('YYYY-MM-DD H:mm:s')
        };
        ////console.log(newChat);
        var query = connection.query('INSERT INTO tbl_message SET ?', newChat, function (err, result) {
            if (err) {
                console.log(err);
                throw err;
            } else {
                data.chatId = result.insertId;
                data.timestamp = moment(newChat.timestamp).unix();
                var clientSocket = onlineClient['userid' + data.to_id];
                if (clientSocket == null) {
                } else {
                    clientSocket.emit('receivePrivateMsg', data);
                }

                var clientSocket2 = onlineClient['userid' + data.from_id];
                clientSocket2.emit('receivePrivateMsg', data);
                var childChat1 = {
                    chatId: data.chatId,
                    user_id: data.from_id,
                    is_read: "1",
                    timestamp: moment().format('YYYY-MM-DD H:mm:s'),
                    readTimestemp: moment().format('YYYY-MM-DD H:mm:s'),
                };

                var child_query1 = connection.query('INSERT INTO tbl_child_message SET ?', childChat1, function (err, result) {
                    if (err) {
                        throw err;
                    }
                });

                var childChat2 = {
                    chatId: data.chatId,
                    user_id: data.to_id,
                    timestamp: moment().format('YYYY-MM-DD H:mm:s')
                };
                var child_query2 = connection.query('INSERT INTO tbl_child_message SET ?', childChat2, function (err, result) {
                    if (err) {
                        throw err;
                    }
                });



            }
        });
    });


     /***************************************************************************************************************************************************************/
    /************************************************************************ /typing ************************************************************************/
    /**
     * @api {socket:event} :::typing typing
     * @apiDescription typing
     * @apiGroup Chat
     * @apiName typing
     * ***************************************************************************************************************************************************************
     
     * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.currentUser                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.oppUser                                              Object parameter
          * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */

    socket.on('typing', function (data, callback) {
        if (data.oppUser in users) {
            users[data.oppUser].emit('typing', {
                oppUser: data.oppUser,
                currentUser: data.currentUser
            });
            ////console.log('typing ..... ');
        }
    });


     /***************************************************************************************************************************************************************/
    /************************************************************************ /typing ************************************************************************/
    /**
     * @api {socket:event} :::typing typing
     * @apiDescription typing
     * @apiGroup Chat
     * @apiName typing
     * ***************************************************************************************************************************************************************
     
     * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.currentUser                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.oppUser                                              Object parameter
          * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */
    socket.on('stopTyping', function (data, callback) {
        if (data.oppUser in users) {
            users[data.oppUser].emit('stop typing');
            ////console.log('Stop typing ..... ');
        }
    });


       /***************************************************************************************************************************************************************/
    /************************************************************************ /disconnects ************************************************************************/
    /**
     * @api {socket:event} :::disconnects disconnects
     * @apiDescription when the user disconnects.. perform this
     * @apiGroup Chat
     * @apiName disconnects
     * ***************************************************************************************************************************************************************
     
     * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.userId                                              Object parameter
     * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */

    socket.on('disconnects', function (data) {

        var ind = users.indexOf(data.userId);
        users.splice(ind, 1);
        delete onlineClient['userid' + data.userId];
        socket.leave(socket.room);

    });


   /***************************************************************************************************************************************************************/
    /************************************************************************ /onlineFriends ************************************************************************/
    /**
     * @api {socket:event} :::onlineFriends onlineFriends
     * @apiDescription onlineFriends
     * @apiGroup Chat
     * @apiName onlineFriends
     * ***************************************************************************************************************************************************************
     
     * @apiParam (Expected parameters) {object}            data                                              Object parameter
     * @apiParam (Expected parameters) {object}            data.userId                                              Object parameter
     * ***************************************************************************************************************************************************************
     * @apiVersion 0.0.1
     */
    // 

    socket.on('onlineFriends', function (data) {
        var datas = [];
        waterfall([
            function (callback) {
                connection.query('SELECT *, CASE WHEN t_c_r.to = ' + data.userId + ' THEN t_c_r.from WHEN t_c_r.from = ' + data.userId + ' THEN t_c_r.to END as friend_id FROM tbl_contact_request as t_c_r where t_c_r.status=2 and (t_c_r.from= ' + data.userId + ' or t_c_r.to= ' + data.userId + ')', function (err, rows, fields) {
                    if (err) {
                        ////console.log(err)
                        datas.result = [];
                    } else {
                        datas.result = rows;
                    }
                    callback(null, datas);
                });
            },
            function (arg1, callback) {
                datas.onlineFriends = [];
                var onlineFriends = [];
                var rows = datas.result;
                var j = 0;
                forEach(rows, function (item, index, arr) {
                    if (users.indexOf(item.friend_id) >= 0)
                    {

                        connection.query('SELECT * FROM tbl_user as t_u where t_u.userid=' + item.friend_id, function (err1, rows1, fields1) {
          
                            if (err1)
                            {
                                throw err;
                            } else
                            {
                                var friendData = {};
                                friendData = {
                                    fullname: rows1[0].fullname,
                                    mobile: rows1[0].mobile,
                                    profilePic: rows1[0].profilePic,
                                    userId: rows1[0].userid,
                                };
                                (datas.onlineFriends).push(friendData);
                            }
                        });
                    }

                    if (index === (rows.length) - 1)
                    {
                        callback(null, datas);
                    }
                });
            }
        ], function (err, result) {
            socket.emit('onlineFriends', result.onlineFriends);
        });
    });
});



//current date and time of any country!
function currentDateTime(city, offset)
{
    // create Date object for current location
    d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    currentdate = new Date(utc + (3600000 * offset));

    // return time as a string

    var datetime = currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear() + " @ " +
            currentdate.getHours() + ":" +
            currentdate.getMinutes() + ":" +
            currentdate.getSeconds();
    return datetime;

}