const socket = require('socket.io');
const models = require('../db');

const { Comment, User } = models;

exports.connectCommentsSocket = server => {
    const io = socket(server);

    io.on('connection', socket => {
        console.log(`User connected.`);
            socket.on('addComment', data => {
                console.log(data.text);
                if (data.text) {
                    User
                        .findOne({
                            where: {
                                id: data.userId
                            }
                        })
                        .then(user => {
                            Comment
                                .create({
                                    userId: data.userId,
                                    campaignId: data.campaignId,
                                    text: data.text,
                                })
                                .then(comment => {
                                    if (comment) {
                                        data.user = {};
                                        data.id = comment.id;
                                        data.user.firstName = user.firstName;
                                        data.user.lastName = user.lastName;
                                        data.createdAt = comment.createdAt;
                                        io.emit('commentAdded', data);
                                    }
                                })
                        });
                }
            });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

    });
};

exports.getAllComments = (req, res) => {
    const { id } = req.params;

    Comment
        .findAll({
            where: {
                campaignId: id
            },
            include: [{
                model: User,
                as: 'user',
                attributes: ['firstName', 'lastName']
            }],
            attributes: ['id', 'text', 'createdAt']

        })
        .then(comments => {
            return res.send({ comments });
        })
        .catch(err => {
            console.log("log: ", err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later' });
        });

};