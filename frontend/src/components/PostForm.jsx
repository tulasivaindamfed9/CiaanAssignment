import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import './PostForm.css';

class PostForm extends Component {
  static contextType = useAuth;

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { content } = this.state;
    const { onSubmit } = this.props;

    if (!content.trim()) {
      toast.error('Post content cannot be empty');
      return;
    }

    try {
      await onSubmit(content);
      this.setState({ content: '' });
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  render() {
    const { content } = this.state;
    const { user } = this.context;

    return (
      <div className="post-form-container">
        <div className="post-form-avatar">
          <span className="post-form-initial">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <form className="post-form" onSubmit={this.handleSubmit}>
          <textarea
            className="post-textarea"
            rows="3"
            placeholder="What's on your mind?"
            value={content}
            onChange={this.handleChange}
          />
          <div className="post-form-actions">
            <button type="submit" className="post-submit-btn">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostForm;
