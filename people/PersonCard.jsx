import React from "react";
// import * as peopleService from "../services/peopleService";

const PersonCard = props => {
  const onDeleteButtonHandler = () => {
    props.handleDelete(props.person.id);
  };

  const onUpdateButtonHandler = () => {
    props.handleEdit(props.person.id);
  };

  return (
    <div className="col-xs-2 ">
      <div className="col-xs-2">
        {props.person.primaryImage ? (
          <img
            className="col-md-2"
            src={props.person.primaryImage.imageUrl}
            id="primaryImageUsers"
            alt=""
          />
        ) : (
          <img
            src="https://media.giphy.com/media/YATuAFPZUrSk8/giphy.gif"
            id="primaryImageUsers"
            alt=""
          />
        )}
        <div className="container">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={onUpdateButtonHandler}
          >
            Update
          </button>

          <button
            type="button"
            onClick={onDeleteButtonHandler}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </div>
        <div className="card-body">
          <div className="card-title">
            <h2>
              <span id="titleUsers"> {props.person.title}</span>{" "}
              <span id="bioUsers">{props.person.bio}</span>
            </h2>
          </div>
        </div>
        <div className="card-text">
          <h4>
            <span id="headlineUsers" value={props.person.headline}>
              {" "}
            </span>
          </h4>
          <p>
            <span id="summaryUsers" value={props.person.summary} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
