import React from "react";
import * as PeopleService from "../../services/peopleService";

class ProfileForm extends React.Component {
  state = {
    id: "",
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    primaryImage: ""
  };

  onClickHandler = evt => {
    evt.preventDefault();
    let payload = this.state;
    console.log(payload);
    PeopleService.postProfile(payload)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = response => {
    console.log(response);
    this.props.history.push("/people");
  };

  onActionError = errResponse => {
    console.log(errResponse);
  };

  handleChange = event => {
    let { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>{this.state.title}</h2>
            <h3>{this.state.headline}</h3>
            <h4>{this.state.bio}</h4>
          </div>
        </div>
        <form className="form">
          <div className="col-md-6">
            <h1 align="center">User Profile</h1>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                placeholder="Title"
                type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Bio">Bio</label>
              <textarea
                rows="4"
                placeholder="Bio"
                type="text"
                className="form-control"
                name="bio"
                value={this.state.bio}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                placeholder="Summary"
                type="text"
                className="form-control"
                name="summary"
                value={this.state.summary}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="headline">Headline</label>
              <input
                placeholder="Headline"
                type="text"
                className="form-control"
                name="headline"
                value={this.state.headline}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="slug">Slug</label>
              <input
                placeholder="Slug"
                type="text"
                className="form-control"
                name="slug"
                value={this.state.slug}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="statusId">statusId</label>
              <input
                placeholder="statusId"
                type="text"
                className="form-control"
                name="statusId"
                value={this.state.statusId}
                onChange={this.handleChange}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input
                placeholder="Skills"
                type="text"
                className="form-control"
                name="skills"
                value={this.state.skills}
                onChange={this.handleChange}
              /> */}

            <div className="form-group" />
            <label htmlFor="primaryImage">Primary Image</label>
            <input
              placeholder="Primary Image"
              type="text"
              className="form-control"
              name="primaryImage"
              value={this.state.primaryImage}
              onChange={this.handleChange}
            />
            <button
              type="button"
              onClick={this.onClickHandler}
              className="btn btn-primary"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileForm;
