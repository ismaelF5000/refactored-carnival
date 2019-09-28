import React from "react";
import * as blogService from "../../services/BlogService";

class EditBlog extends React.Component {
  state = {
    id: "",
    title: "",
    shortTitle: "",
    content: "",
    shortDescription: "",
    slug: "",
    metaData: {
      dateStart: "",
      section: ""
    },
    statusId: "",
    primaryImage: [],
    tags: []
  };

  componentDidMount() {
    blogService
      .getBlogById(this.props.match.params.id)
      .then(this.onGetIdSuccess)
      .catch(this.onError);
  }

  onGetIdSuccess = response => {
    debugger;
    console.log(response);
    const blog = response.item;
    this.setState({
      id: this.props.match.params.id,
      title: blog.title,
      shortTitle: blog.shortTitle,
      content: blog.content,
      shortDescription: blog.shortDescription,
      slug: blog.slug,
      metaData: blog.metaData,
      statusId: blog.statusId,
      primaryImage: blog.images[0],
      tags: blog.tags[0]
    });
  };

  handleChange = evt => {
    const key = evt.target.name;
    const value = evt.target.value;
    this.setState({
      [key]: value
    });
  };

  handleMetaData = evt => {
    const key = evt.target.name;
    const value = evt.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        metaData: {
          ...prevState.metaData,
          [key]: value
        }
      };
    });
  };
  // function to update tags
  handleTags = evt => {
    const key = evt.target.name;
    const value = evt.target.value;
    this.setState({
      tags: { [key]: [value] }
    });
  };

  handleUpdate = evt => {
    evt.preventDefault();
    let payload = {
      id: this.state.id,
      title: this.state.title,
      shortTitle: this.state.shortTitle,
      content: this.state.content,
      shortDescription: this.state.shortDescription,
      slug: this.state.slug,
      metaData: this.state.metaData,
      statusId: this.state.statusId,
      tags: this.state.tags.tagName,
      primaryImage: this.state.primaryImage.imageUrl
    };

    blogService
      .updateBlog(payload)
      .then(this.onUpdateSuccess)
      .catch(this.onError);
  };

  onUpdateSuccess = response => {
    console.log(response);
    this.props.history.push("/blogs");
  };

  onError = response => {
    console.log(response, "No No No");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {this.state.title}
            <div className="form-group">
              <label>Title</label>
              <input
                value={this.state.title}
                onChange={this.handleChange}
                className="form-control"
                name="title"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Short Title</label>
              <input
                onChange={this.handleChange}
                value={this.state.shortTitle}
                className="form-control"
                name="shortTitle"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <input
                name="content"
                value={this.state.content}
                onChange={this.handleChange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <input
                name="shortDescription"
                value={this.state.shortDescription}
                className="form-control"
                onChange={this.handleChange}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Slug</label>
              <input
                name="slug"
                value={this.state.slug}
                onChange={this.handleChange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Date Start</label>
              <input
                name="dateStart"
                value={this.state.metaData.dateStart}
                onChange={this.handleMetaData}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Section</label>
              <input
                name="section"
                value={this.state.metaData.section}
                className="form-control"
                onChange={this.handleMetaData}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <input
                name="statusId"
                value={this.state.statusId}
                onChange={this.handleChange}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Tags</label>
              <input
                name="tagName"
                value={this.state.tags.tagName}
                onChange={this.handleTags}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Primary Image</label>
              <input
                name="primaryImage"
                value={this.state.primaryImage.imageUrl}
                className="form-control"
                onChange={this.handleChange}
                type="text"
              />
            </div>
            <button
              type="submit"
              className="btn btn-small btn-primary"
              style={{ float: "right" }}
              onClick={this.handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditBlog;
