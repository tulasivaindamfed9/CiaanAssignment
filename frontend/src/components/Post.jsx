import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  render() {
    const { post } = this.props;

    return (
      <div className="post-card">
        <div className="post-header">
          <div className="post-avatar">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
          <div className="post-author-info">
            <h3 className="post-author-name">{post.author.name}</h3>
            <p className="post-date">{this.formatDate(post.createdAt)}</p>
          </div>
        </div>
        <p className="post-content">{post.content}</p>
      </div>
    );
  }
}

export default Post;
