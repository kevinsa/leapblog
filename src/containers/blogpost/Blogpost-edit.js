import React from "react";
import { withRouter } from 'react-router-dom';
import BlogForm from '../../components/BlogForm';
import Alert from '../../components/Alert';
const { updateBlogPost } = require('../../api/BlogPost');

class BlogPostEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorking: false,
      hasSubmitErrors: false,
      errorMessage: '',
    }
    
    this.handleBlogEdit = this.handleBlogEdit.bind(this);
  }

  handleBlogEdit(blogData) {
    this.setState({ isWorking: true });

    let blogPostId = this.props.match.params.id;
    updateBlogPost(blogData, blogPostId)
      .then((res) => {
        this.setState({ isWorking: false });
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ isWorking: false });

        if(err.response) {
          const message = `${err.response.status} ${err.response.statusText}`;
          this.setState({ hasSubmitErrors: true, errorMessage: message });
        }
        else {
          const message = err.message;
          this.setState({ hasSubmitErrors: true, errorMessage: message });
        }
      });
  }
  
  render() {
    return(
      <div className="row">
        <div className="col-md-12">
          { this.state.hasSubmitErrors ? <Alert message={this.state.errorMessage} alertStyle={"alert alert-danger"}/> : ''}
          <BlogForm blogEditCallback={this.handleBlogEdit} isSubmitting={this.state.isWorking} blogPostId={this.props.match.params.id}/>
        </div>
      </div>
    );
  }
}

export default withRouter(BlogPostEditPage)

