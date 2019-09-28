import React from "react";
const BlogCard = props => {
  const onViewMoreHandler = () => {
    props.handleViewMore(props.blog);
  };
  const onEditHandler = () => {
    props.handleEdit(props.blog.id);
  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.blog.title} </h5>
          <p className="card-text">
            {`By ${props.blog.author.firstName} ${props.blog.author.lastName} ${
              props.blog.dateCreated
            }`}
          </p>
          {props.blog.content}
          {props.blog.shortDescription}
          {props.blog.images[0].imageUrl ? (
            <img
              src={props.blog.images[0].imageUrl}
              className="card-img-top"
              alt="..."
            />
          ) : (
            <img
              src="https://media.giphy.com/media/pnPfFgZi3lnO/giphy.gif"
              alt=""
            />
          )}
          {/*Get more clear info */}
          {props.showBtn ? (
            <>
              <button
                type="button"
                onClick={onViewMoreHandler}
                className="btn btn-sm btn-primary"
              >
                View More
              </button>

              <button
                type="button"
                onClick={onEditHandler}
                className="btn btn-sm btn-warning"
              >
                Edit Blog
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BlogCard;
