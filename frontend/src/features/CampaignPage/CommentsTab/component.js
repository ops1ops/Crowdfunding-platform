import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import './style.css';
import { Container } from 'react-bootstrap';
import CommentComponent from './CommentComponent/component';
import api from '../../../services/api';
import CommentForm from './CommentForm/component';
import { Link } from 'react-router-dom';
import { notification, Tooltip } from 'antd';
import reformatComments from '../../../utils/reformatComments';

class CommentsTab extends Component {
    constructor(props) {
        super(props);
        this.socket = io(`http://localhost:8000/comments`);
        this.socket.emit('join', this.props.id);
        this.socket.on('commentAdded', data => {
            this.setState({ comments: [...this.state.comments, data] });
        });
        this.state = {
            comments: [],
            text: '',
        };
    }

    componentDidMount() {
        const { id, user } = this.props;
        const data = {
            id,
            userId: user.id ? user.id : 0,
        };

        api.comments
            .getAll(data)
            .then(response => {
                const comments = reformatComments(response);
                console.log(comments)
                this.setState({ comments });
            })
            .catch(err => {
                notification.error({
                    message: 'Loading error',
                    description: err.response.data.errors,
                });
            });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    handleChange = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    handleAdd = e => {
        e.preventDefault();
        const { text } = this.state;
        const data = {
            text: text.trim(),
            userId: this.props.user.id,
            campaignId: this.props.id,
        };
        this.setState({ text: '' });
        this.socket.emit('addComment', data);
    };

    render() {
        const { comments, text } = this.state;
        const { user, id } = this.props;

        return (
            <div>
                <Container className="Container">
                    {user.isAuthorized ? (
                        <CommentForm
                            handleChange={this.handleChange}
                            handleAdd={this.handleAdd}
                            text={text}
                        />
                    ) : (
                        <p className="text-center h6 py-2">
                            You need <Link to="/login">log in</Link> to leave comments, like or dislike them
                        </p>
                    )}
                    {comments.length ? (
                        comments.map(comment => (
                            <CommentComponent
                                key={comment.id}
                                comment={comment}
                                dislikes={comment.dislikesCount}
                                likes={comment.likesCount}
                                likeState={comment.likedBy.state}
                                campaignId={id}
                                currentUser={user}
                            />
                        ))
                    ) : (
                        <p className="text-center h6 mt-2">No comments yet</p>
                    )}
                </Container>
            </div>
        );
    }
}

CommentsTab.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

export default CommentsTab;
