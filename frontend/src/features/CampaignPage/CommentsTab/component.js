import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import './style.css';
import { Container } from 'react-bootstrap';
import CommentComponent from './CommentComponent/component';
import api from '../../../services/api';
import CommentForm from './CommentForm/component';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

class CommentsTab extends Component {
    constructor(props) {
        super(props);
        this.socket = io(`http://localhost:8000/comments`);
        this.socket.emit('join', this.props.id);
        this.socket.on('commentAdded', data => {
            // if (data.campaignId === this.props.id) {
            this.setState({ comments: [...this.state.comments, data] });
            // }
        });
        this.state = {
            comments: [],
            text: '',
        };
    }

    componentDidMount() {
        api.comments
            .getAll(this.props.id)
            .then(response => {
                this.setState({ comments: response.comments });
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
        const { user } = this.props;

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
                            You need <Link to="/login">log in</Link> to leave comments
                        </p>
                    )}
                    {comments.length ? (
                        comments.map(comment => (
                            <CommentComponent key={comment.id} comment={comment} />
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
