import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
`;

export class BlogPostCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    }

    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  onCommentSubmit(event) {
    event.preventDefault();
    if(this.state.comment.length > 0) {
      this.props.addCommentCallback(this.state.comment);
    }
  }

  handleCommentChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState( {comment: value });
  }

  render() {
    if(this.props.loggedInUser) {
      return(
        <FormContainer><form onSubmit={this.onCommentSubmit}>
        <input type="text" 
                className="form-control" 
                id="comment"
                name="comment"
                placeholder="have an interesting comment?" 
                value={this.state.comment}
                onChange={this.handleCommentChange} />
        </form>
      </FormContainer>
      );
    }
    else {
      return '';
    }
  }
}