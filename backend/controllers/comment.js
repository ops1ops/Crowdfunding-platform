const socket = require('socket.io');
const models = require('../db');

const { Comment, User, Like } = models;

exports.connectCommentsSocket = server => {
    const serverSocket = socket(server);
    const io = serverSocket.of('/comments');
    io.on('connection', socket => {
        console.log(`User connected.`);
        socket.on("join", campaignId => {
            console.log("User joined from campaign", campaignId);
            socket.join(campaignId);
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
                                        data.likedBy = { state: null };
                                        data.likesCount = 0;
                                        data.dislikesCount = 0;
                                        io.to(campaignId).emit('commentAdded', data);
                                    }
                                })
                        });
                }
            });
        })


        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

    });
};

exports.getAllComments = (req, res) => {
    const { id, userId } = req.params;

    Comment
        .findAll({
            where: {
                campaignId: id
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['firstName', 'lastName']
                },
                {
                    model: User,
                    as: 'likedBy',
                    attributes: ['id'],
                    through: {
                        where: { userId },
                        attributes: ['state']
                    }
                },
                {
                    model: Like,
                    as: 'Likes',
                    attributes: ['state']
                },
            ],
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

exports.likeComment = (req, res) => {
    const { data } = req.body;

    Like
        .findOrCreate({
            where: {
                userId: data.userId,
                commentId: data.commentId
            },
            defaults: { state: data.state }
        })
        .then(([like, created]) => {
            if (!created) {
                Like
                    .update(
                        {
                            state: data.state,
                        },
                        {
                            where: {
                                userId: data.userId,
                                commentId: data.commentId
                            }
                        }
                    )
                    .then(isUpdated => {
                        if (!isUpdated) return res.status(400).send({ errors: 'Could not like comment' });
                        return res.send({ message: 'Successfully liked' });
                    })
                    .catch(err => {
                        console.log("log: ", err);
                        return res.status(500).send({ errors: 'Unexpected error. Try again later' });
                    })
            } else {
                return res.send({ message: 'Successfully liked' });
            }
        })
        .catch(err => {
            console.log("log: ", err);
            return res.status(500).send({ errors: 'Unexpected error. Try again later' });
        })
}