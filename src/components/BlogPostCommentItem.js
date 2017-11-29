import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommentList = styled.div`
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
`;

const CommentItem = styled.div`
  padding-bottom: 15px;
`;

const CircleImage = styled.img`
  border-radius: 50%;
  vertical-align: middle;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const ActionLink = styled.a`
  cursor: pointer;
  margin-left: 10px;
`;

const DeleteLink = styled.a`
  cursor: pointer;
  margin-left: 10px;
  color: #a94442;
`;

export class BlogPostCommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      updatedComment: ''
    }

    this.deleteCommentItem = this.deleteCommentItem.bind(this);
    this.editCommentItem = this.editCommentItem.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onCommentEditSubmit = this.onCommentEditSubmit.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  deleteCommentItem() {
    console.log(this.props.blogComment);
    this.props.deleteCommentCallback(this.props.blogComment);
  }

  editCommentItem(event) {
    this.setState({ isEditing: true });
  }

  onCancelEdit() {
    this.setState({ isEditing: false });
  }

  handleCommentChange(event) {
    const value = event.target.value
    this.setState( {updatedComment: value });
  }

  onCommentEditSubmit(event) {
    event.preventDefault();
    if(this.state.updatedComment.length > 0) {
      this.props.editCommentCallback(this.props.blogComment, this.state.updatedComment);
      this.setState({ isEditing: false });
    }
  }

  render() {
    let actionsContent = <span className="pull-right">
      <ActionLink onClick={this.editCommentItem}>
      <i className="fa fa-pencil" aria-hidden="true"></i> edit</ActionLink>
      <DeleteLink onClick={this.deleteCommentItem}>
        <i className="fa fa-trash" aria-hidden="true"></i> delete</DeleteLink>
      </span>

    let editCancelContent = <span className="pull-right"><ActionLink onClick={this.onCancelEdit}>
    <i className="fa fa-window-close" aria-hidden="true"></i> cancel</ActionLink></span>

    if(!this.state.isEditing) {
      return(
        <CommentList>
          <div>
          <CommentItem>
            <span className="pull-left">
              <CircleImage src="http://lorempixel.com/40/40" />
            </span>
            <div>
            { (this.props.loggedInUser && this.props.loggedInUser.uid === this.props.blogComment.user.uid) ? actionsContent : '' }
              
              <strong>{this.props.blogComment.user.displayName}</strong>
              <small>  on {new Date(this.props.blogComment.date).toString()} </small>
              <br />
              
              <small className="text-muted">{this.props.blogComment.content}</small>
            </div>
          </CommentItem>
          </div>
        </CommentList>
      );
    }
    else {
      return(
        <CommentList>
          <div>
          <CommentItem>
            <span className="pull-left">
              <CircleImage src="http://lorempixel.com/40/40" />
            </span>
            <div>
            { (this.props.loggedInUser && this.props.loggedInUser.uid === this.props.blogComment.user.uid) ? editCancelContent : '' }
              
              <strong>{this.props.blogComment.user.displayName}</strong>
              <small>  on {new Date(this.props.blogComment.date).toString()} </small>
              <br />
              
              <form onSubmit={this.onCommentEditSubmit}>
                <input type="text" 
                        className="form-control" 
                        id="comment"
                        name="comment"
                        placeholder={this.props.blogComment.content} 
                        value={this.state.updatedComment}
                        onChange={this.handleCommentChange} />
              </form>
            </div>
          </CommentItem>
          </div>
        </CommentList>
      );
    }
  }
}

BlogPostCommentItem.propTypes = {
  blogComment: PropTypes.object,
  deleteCommentCallback: PropTypes.func,
  editCommentCallback: PropTypes.func,
  loggedInUser: PropTypes.object
};