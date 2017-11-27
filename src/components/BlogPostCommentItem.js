import React from 'react';
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

const DateSmall = styled.small`
  margin-left: 10px;
`;

const DeleteLink = styled.a`
  cursor: pointer;
`;

export class BlogPostCommentItem extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCommentItem = this.deleteCommentItem.bind(this);
  }

  deleteCommentItem() {
    console.log(this.props.blogComment);
    this.props.deleteCommentCallback(this.props.blogComment);
  }

  render() {
    let actionsContent = <span className="pull-right">
      <DeleteLink onClick={this.deleteCommentItem}><i className="fa fa-trash" aria-hidden="true"></i> delete</DeleteLink>
      </span>

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
}