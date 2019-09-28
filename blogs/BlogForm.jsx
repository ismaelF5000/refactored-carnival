import React from "react";
import * as BlogService from "../../services/BlogService";

class BlogForm extends React.Component {
  state = {
    title: "",
    shortTitle: "",
    content: "",
    shortDescription: "",
    slug: "",
    statusId: 1,
    metaData: {
      dateStart: "",
      section: ""
    },
    primaryImage: "",
    tags: []
  };

  onClickHandler = () => {
    let payload = this.state;
    debugger;

    BlogService.postBlog(payload)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = response => {
    console.log(response, "Yeehaw");
  };

  onActionError = error => {
    console.log(error);
  };

  handleChange = evt => {
    const key = evt.target.name;
    const value = evt.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        [key]: value
      };
    });
  };
  //function to get tags
  handleTags = evt => {
    // let key = evt.target.name;
    let value = evt.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        tags: [value]
      };
    });
  };

  handleMetaData = evt => {
    // let { name, value } = event.target;
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

  render() {
    return (
      <div className="container">
        <h2 className="mt-5">Create Blog</h2>
        <div className="col-md-6">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            name="title"
            className="form-control"
            placeholder="Title"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="shortTitle">Short Title</label>
          <input
            type="text"
            value={this.state.shortTitle}
            onChange={this.handleChange}
            name="shortTitle"
            className="form-control"
            placeholder="Short Title"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="Content">Content</label>
          <input
            className="form-control"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            placeholder="Content"
            type="text"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="shortDescription">Short Description</label>
          <input
            placeholder="Short Description"
            name="shortDescription"
            value={this.state.shortDescription}
            onChange={this.handleChange}
            className="form-control"
            type="text"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="slug">Slug</label>
          <input
            placeholder="Slug"
            name="slug"
            onChange={this.handleChange}
            value={this.state.slug}
            className="form-control"
            type="text"
          />
        </div>
        <br />
        <div className="form-inline">
          <label className="">Date Start</label>
          <input
            type="text"
            name="dateStart"
            value={this.state.metaData.dateStart}
            onChange={this.handleMetaData}
            className="form-control mb-2 mr-sm-2"
            placeholder="Date"
          />
          <label>Section</label>
          <input
            name="section"
            value={this.state.metaData.section}
            onChange={this.handleMetaData}
            className="form-control mb-2 mr-sm-2"
            type="text"
          />
          <label>Status</label>
          <input
            name="statusId"
            onChange={this.handleChange}
            value={this.state.statusId}
            className="form-control mb-2 mr-sm-2"
            type="text"
          />
          <label>Tags</label>
          <input
            name="tagsName"
            onChange={this.handleTags}
            value={this.state.tags.tagsName}
            className="form-control mb-2 mr-sm-2"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="primaryImage">Primary Image</label>
          <input
            placeholder="Primary Image"
            type="text"
            className="form-control col-md-6"
            value={this.state.primaryImage}
            onChange={this.handleChange}
            name="primaryImage"
          />
          <button
            type="button"
            onClick={this.onClickHandler}
            className="btn btn-sm btn-primary"
            style={{ margin: "30px" }}
          >
            Submit
          </button>

          <button
            onClick={this.onClickHandler}
            type="button"
            className="btn btn-sm btn-danger"
          >
            Close
          </button>
        </div>
      </div>
      //   </div>
    );
  }
}

export default BlogForm;
