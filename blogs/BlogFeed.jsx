import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const BlogFeed = props => {
  const firstPgHandler = () => {
    props.firstPg(props.blog);
  };

  const previousButtonHandler = () => {
    props.previousButton(props.blog);
  };

  const nextButtonHandler = () => {
    props.nextButton(props.blog);
  };

  return (
    <>
      <h5 className="header">Search</h5>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for..."
        />
        <button className="btn btn-secondary" type="button">
          Go!
        </button>
      </div>
      <div>
        <h6 className="card-header">Recently Added Blogs</h6>
      </div>
      <div>
        <Pagination>
          <PaginationItem>
            <PaginationLink first onClick={firstPgHandler} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous onClick={previousButtonHandler} />
            {props.mappedBlogs}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={nextButtonHandler} />
          </PaginationItem>
        </Pagination>
        <br />
      </div>
    </>
  );
};

export default BlogFeed;
