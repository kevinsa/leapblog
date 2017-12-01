import React from "react";
import { withRouter } from 'react-router-dom';
import BlogForm from '../../components/BlogForm';
import Alert from '../../components/Alert';
const { createBlogPost } = require('../../api/BlogPost');

class BlogPostAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      hasSubmitErrors: false,
      errorMessage: '',
    }
  }

  handleBlogAdd = (blogData) => {
    this.setState({ isSubmitting: true });

    createBlogPost(blogData)
      .then((res) => {
        this.setState({ isSubmitting: false });
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ isSubmitting: false });

        if(err.response) {
          const message = `${err.response.status} ${err.response.statusText}`;
          this.setState({ hasAuthErrors: true, error: message });
        }
        else {
          const message = err.message;
          this.setState({ hasAuthErrors: true, error: message });
        }
      });
  }

  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          { this.state.hasSubmitErrors ? <Alert message={this.state.errorMessage} alertStyle={"alert alert-danger"}/> : ''}
          <BlogForm blogSubmitCallback={this.handleBlogAdd} isSubmitting={this.state.isSubmitting}/>
        </div>
      </div>
    );
  }
}

export default withRouter(BlogPostAddPage)