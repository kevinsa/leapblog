import React from 'react';
const { getBlogPostById } = require('../api/BlogPost');

export class BlogForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      titleValid: false,
      contentValid: false,
      formValid: false,
      titlePrisitine: true,
      contentPristine: true,
      isLoading: false,
      blogPost: {}
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  setEditInitialState(response) {
    this.setState({ 
      isLoading: false, 
      blogPost: response.data.blogposts,
      title: response.data.blogposts.title,
      content: response.data.blogposts.content,
      titleValid: true,
      contentValid: true,
      formValid: true,
      titlePrisitine: false,
      contentPristine: false,
     });
  }

  componentDidMount() {
      this.setState({ isLoading: true })
      
      getBlogPostById(this.props.blogPostId)
        .then((res) => {
          this.setEditInitialState(res);
        })
        .catch((err) => {
          this.setState({ isLoading: false, blogPost: {}, title: '', content: '' })
  
        });
  }

  handleTitleChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState({ title: value, titlePrisitine: false},
      () => this.validateField(name, value) );
  }

  handleContentChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState( {content: value, contentPristine: false },
      () => this.validateField(name, value) );
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.props.blogPostId !== null) {
      //update existing blog post
      this.props.blogEditCallback({
        title: this.state.title,
        content: this.state.content
      });
    }
    else {
      //create a new blog post
      this.props.blogSubmitCallback({
        title: this.state.title,
        content: this.state.content
      });
    }
    
    
  }

  validateField(name, value) {
    let titleValid = this.state.titleValid;
    let contentValid = this.state.contentValid;

    switch(name) {
      case 'title':
      titleValid = value.length >= 6;
        break;
      case 'content':
        contentValid = value.length >= 6;
        break;
      default:
        break;
    }
    this.setState({
      titleValid: titleValid,
      contentValid: contentValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.titleValid && this.state.contentValid});
  }

  errorClass(isValid, isPristine) {
    return !isValid && !isPristine? 'has-error' : '';
  }

  render() {
    let loadingContent = <span><i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i></span>;

    return(
      <form onSubmit={this.handleSubmit}>
        <div className={`form-group ${this.errorClass(this.state.titleValid, this.state.titlePrisitine )}`}>
          <label htmlFor="title">title</label>
          <input type="text" 
                 className="form-control" 
                 id="title"
                 name="title"
                 placeholder="a captivating title" 
                 value={this.state.title}
                 onChange={this.handleTitleChange} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.contentValid, this.state.contentPristine )}`}>
          <label htmlFor="content">content</label>
          <input type="text" 
                 className="form-control" 
                 id="content" 
                 name="content"
                 placeholder="some interesting content" 
                 value={this.state.content}
                 onChange={this.handleContentChange} />
        </div>
        <button disabled={!this.state.formValid} type="submit" className="btn btn-default">Add Blog Post</button>
        
        { this.props.isSubmitting ? loadingContent : ''}
      </form>
    );
  }

}