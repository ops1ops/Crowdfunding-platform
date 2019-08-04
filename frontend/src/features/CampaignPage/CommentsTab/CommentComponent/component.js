import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getFullName from '../../../../utils/getFullName';
import { Avatar, Tooltip, Comment } from 'antd';
import * as moment from 'moment';

class CommentComponent extends Component {
    render() {
        const { comment } = this.props;

        return (
            <Comment
                className="Comment border-top mt-2"
                author={getFullName(comment.user.firstName, comment.user.lastName)}
                key={comment.id}
                avatar={<Avatar icon="user" className="Avatar" />}
                content={<p>{comment.text}</p>}
                datetime={
                    <Tooltip
                        title={moment(new Date(comment.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
                    >
                        <span>{moment(new Date(comment.createdAt)).fromNow()}</span>
                    </Tooltip>
                }
            />
        );
    }
}

CommentComponent.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default CommentComponent;
