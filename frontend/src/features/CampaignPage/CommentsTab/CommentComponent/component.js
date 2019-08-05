import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getFullName from '../../../../utils/getFullName';
import { Avatar, Tooltip, Comment, Icon } from 'antd';
import * as moment from 'moment';
import api from '../../../../services/api';

class CommentComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: 0,
            dislikes: 0,
            action: null,
        };
    }

    componentDidMount() {
        const { likes, dislikes, likeState } = this.props;

        this.setState({
            likes,
            dislikes,
            action: likeState,
        });
    }

    dislike = () => {
        const { currentUser, campaignId, comment } = this.props;
        if (this.state.action !== 'disliked' && currentUser.isAuthorized) {
            const data = {
                id: campaignId,
                commentId: comment.id,
                userId: currentUser.id,
                state: 'disliked',
            };

            api.comments
                .likeComment(data)
                .then(res => {
                    if (this.state.action === null) {
                        this.setState({
                            likes: this.state.likes,
                            dislikes: this.state.dislikes + 1,
                            action: 'disliked',
                        });
                    } else if (this.state.action === 'liked') {
                        this.setState({
                            likes: this.state.likes - 1,
                            dislikes: this.state.dislikes + 1,
                            action: 'disliked',
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    };

    like = () => {
        const { currentUser, campaignId, comment } = this.props;
        if (this.state.action !== 'liked' && currentUser.isAuthorized) {
            const data = {
                id: campaignId,
                commentId: comment.id,
                userId: currentUser.id,
                state: 'liked',
            };

            api.comments
                .likeComment(data)
                .then(res => {
                    if (this.state.action === null) {
                        this.setState({
                            likes: this.state.likes + 1,
                            dislikes: this.state.dislikes,
                            action: 'liked',
                        });
                    } else if (this.state.action === 'disliked') {
                        this.setState({
                            likes: this.state.likes + 1,
                            dislikes: this.state.dislikes - 1,
                            action: 'liked',
                        });
                    }
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        const { likes, dislikes, action } = this.state;
        const { comment, currentUser } = this.props;

        const actions = [
            <span>
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={
                            currentUser.isAuthorized
                                ? action === 'liked'
                                    ? 'filled'
                                    : 'outlined'
                                : 'outlined'
                        }
                        onClick={this.like}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
            </span>,
            <span>
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={
                            currentUser.isAuthorized
                                ? action === 'disliked'
                                    ? 'filled'
                                    : 'outlined'
                                : 'outlined'
                        }
                        onClick={this.dislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
            </span>,
        ];

        return (
            <Comment
                actions={actions}
                className="Comment border-top mt-2"
                author={getFullName(comment.user.firstName, comment.user.lastName)}
                key={comment.id}
                avatar={<Avatar icon="user" className="Avatar" />}
                content={<p>{comment.text}</p>}
                datetime={
                    <Tooltip
                        title={moment(new Date(comment.createdAt.toString())).format(
                            'YYYY-MM-DD HH:mm:ss'
                        )}
                    >
                        <span>{moment(new Date(comment.createdAt.toString())).fromNow()}</span>
                    </Tooltip>
                }
            />
        );
    }
}

CommentComponent.propTypes = {
    comment: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    likeState: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    campaignId: PropTypes.number.isRequired,
    currentUser: PropTypes.object.isRequired,
};

export default CommentComponent;
