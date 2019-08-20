import React, { Component } from 'react';
import { Comment, Icon, Tooltip, Avatar, Button } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import comments from './comment.scss';

class CommentComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      likes: 0,
      dislikes: 0,
      action: null,
    };
  }

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  };

  render() {
    const { likes, dislikes, action } = this.state;

    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {likes}
        </span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {dislikes}
        </span>
      </span>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
      <div className={comments.comment}>
        <div className={comments.commentContent}>
          <Comment
            actions={actions}
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            author={<a>Han Solo</a>}
            avatar={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <p>
                We supply a series of design principles, practical
                patterns and high quality design resources (Sketch and
                Axure), to help people create their product prototypes
                beautifully and efficiently.
              </p>
            }
            datetime={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          />
        </div>
      </div>
    );
  }
}

export default CommentComponent;
