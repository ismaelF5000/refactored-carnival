import React from "react";

import * as peopleService from "../../services/peopleService";
import PersonCard from "./PersonCard";

class People extends React.Component {
  state = {
    people: [],
    mappedPeople: [],
    search: "",
    totalCount: 0,
    totalPages: 0,
    pageSize: 4,
    pageIndex: 0,
    hasNextPage: false,
    hasPreviousPage: false
  };
  componentDidMount() {
    peopleService
      .getPeopleList(this.state.pageIndex, this.state.pageSize)
      .then(this.getPeopleListSuccess)
      .catch(this.onPeopleErr);
  }

  onNextButtonClicks = () => {
    peopleService
      .getPeopleList(this.state.pageIndex, this.state.pageSize)
      .then(this.getPeopleListSuccess)
      .catch(this.onPeopleErr);
  };

  onNextButtonClick = () => {
    this.setState(
      {
        pageIndex: this.state.pageIndex + 1
      },
      () => this.onNextButtonClicks()
    );
  };

  onPreviousButtonClick = () => {
    this.setState(
      {
        pageIndex: this.state.pageIndex - 1
      },
      () => this.onNextButtonClicks()
    );
  };

  getPeopleListSuccess = response => {
    // debugger;
    this.setState({
      mappedPeople: response.item.pagedItems.map(this.mapPeople),
      totalCount: response.item.totalCount,
      totalPages: response.item.totalPages,
      hasNextPage: response.item.hasNextPage,
      hasPreviousPage: response.item.hasPreviousPage
    });
  };

  handleChange = event => {
    // debugger;
    let { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  onSearchClick = () => {
    debugger;
    let payload = this.state;
    peopleService
      .search(payload.pageIndex, payload.pageSize, payload.search)
      .then(this.onSearchSuccess)
      .catch(this.onPeopleError);
  };
  //maybe comment out
  onSearchSuccess = response => {
    // debugger;
    console.log(response);
    let query = response.item.pagedItems;
    this.setState({
      mappedPeople: query.map(this.mapquery),
      totalCount: response.item.totalCount,
      totalPages: response.item.totalPages,
      hasNextPage: response.item.hasNextPage,
      hasPreviousPage: response.item.hasPreviousPage
    });
  };
  //dont really need this one, look for reference if needed
  // getPeopleSuccess = data => {
  //   console.log(data.item.pagedItems);

  //   const people = data.item.pagedItems;
  //   this.setState({ people, mappedPeople: people.map(this.mapPeople) });
  // };
  // onPeopleErr = response => {
  //   console.log(response);
  // };

  // updatedUser = id => {
  //   debugger;
  //   this.props.history.push("/people/new" + id);
  // };

  onDeleteById = id => {
    const people = [...this.state.people];
    const newArray = people.filter(person => person.id !== id);
    debugger;
    peopleService.updateStatus(id);
    this.setState({
      people: newArray,
      mappedPeople: newArray.map(this.mapPeople)
    });
  };

  editUser = id => {
    this.props.history.push("/edituser/" + id);
  };

  mapPeople = person => {
    return (
      <PersonCard
        person={person}
        key={person.id}
        handleEdit={this.editUser}
        handleDelete={this.onDeleteById}
      />
    );
  };

  mapquery = person => {
    // debugger;
    return (
      <PersonCard
        person={person}
        key={person.id}
        handleEdit={this.updateUser}
        handleDelete={this.onDeleteById}
      />
    );
  };

  // mapPerson = aPerson => {
  //   return <PersonCard key={aPerson.id} person={aPerson} />;
  // };

  render() {
    return (
      <div>
        <div className="form-group col-md-4">
          <div className="row" />
          <div className="col-md-9">
            <input
              name="search"
              type="text"
              onChange={this.handleChange}
              value={this.state.value}
              className="form-control"
              placeholder="Look me up boi"
            />
          </div>
          {/* {this.state.mappedPeople} */}
          <div className="col-md-auto pt-1" style={{ padding: "0px" }}>
            <button
              onClick={this.onSearchClick}
              className="btn btn-success"
              style={{ height: "35px" }}
            >
              Search Me
            </button>
          </div>
        </div>
        <div>{this.state.mappedPeople}</div>
        <div>
          <button onClick={this.onNextButtonClick}>Next Page</button>
          <button onClick={this.onPreviousButtonClick}>Go back</button>
          {/* {this.state.mappedPeople.map(this.mapPeople)} wrong placement, I should map people in the peopleListSuccess. */}
          current={this.state.pageIndex}
          pageSize={this.state.pageSize}
          total={this.state.totalCount}
        </div>
        <div />
      </div>
    );
  }
}

export default People;
