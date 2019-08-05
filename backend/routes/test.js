const router = require('express').Router();
const models = require('../db');
const User = models.User;
const Campaign = models.Campaign;
const { Comment, Like } = models;

router.get('/test', (req, res) => {
    Comment
        .findAll({
            include: [
                {
                    model: User,
                    as: 'likedBy',
                    through: {
                        where: {userId: 47}
                    }
                },
                {
                    model: Like,
                    as: 'Likes',
                    attributes: ['state']
                },
            ]
        })
        .then(comments => {
            return res.send({ comments })
            // const dislikesCount = comments.Likes.reduce((prev, cur) => {
            //     if (cur.state === 'disliked') return prev + 1;
            // }, 0);
            // console.log(dislikesCount)
        })
        .catch(err => console.log(err))
});


module.exports = router;