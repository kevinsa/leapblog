import React from 'react';

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
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
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
    this.props.blogSubmitCallback({
      title: this.state.title,
      content: this.state.content
    });
    event.preventDefault();
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