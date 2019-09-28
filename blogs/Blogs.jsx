import React from "react";
import * as blogService from "../../services/BlogService";
import BlogCard from "./BlogCard";
import BlogFeed from "./BlogFeed";
import EditBlog from "./EditBlog";
// import { PaginationItem, PaginationLink } from "reactstrap";

class Blogs extends React.Component {
  state = {
    blog: {},
    blogs: [],
    mappedBlogs: [],
    search: "",
    totalCount: 0,
    totalPages: 0,
    pageSize: 5,
    pageIndex: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isShowing: false
  };

  componentDidMount() {
    this.getPage();
  }

  getPage = () => {
    blogService
      .getBlogs(this.state.pageIndex, this.state.pageSize)
      .then(this.getFeedSuccess)
      .catch(this.onErorr);
  };

  firstPg = () => {
    this.setState(
      {
        pageIndex: 0
      },
      () => this.getPage
    );
  };

  lastPage = () => {
    this.setState(
      {
        pageIndex: this.state.totalPages - 1
      },
      () => this.getPage()
    );
  };

  onNextButtonClick = () => {
    this.setState(
      {
        pageIndex: this.state.pageIndex + 1
      },
      () => this.getPage()
    );
  };

  onPreviousButtonClick = () => {
    this.setState(
      {
        pageIndex: this.state.pageIndex - 1
      },
      () => this.getPage()
    );
  };

  getFeedSuccess = response => {
    let blog = response.item.pagedItems[0];
    let blogs = response.item.pagedItems;
    this.setState({
      blog,
      blogs,
      mappedBlogs: blogs.map(this.mapBlogs),
      totalCount: response.item.totalCount,
      totalPages: response.item.totalPages,
      hasNextPage: response.item.hasNextPage,
      hasPreviousPage: response.item.hasPreviousPage
    });
  };

  onActionError = errResponse => {
    console.log(errResponse);
  };

  viewFeatured = selectedBlog => {
    let oldBlog = { ...this.state.blog };
    let upDateBlogs = [...this.state.blogs];
    let index = upDateBlogs.findIndex(blog => blog.id === selectedBlog.id);
    upDateBlogs.splice(index, 1);
    upDateBlogs.concat(oldBlog);
    this.setState(prevState => {
      return {
        ...prevState,
        blog: selectedBlog,
        blogs: upDateBlogs,
        mappedBlogs: upDateBlogs.map(this.mapBlogs)
      };
    });
  };

  editBlog = id => {
    this.props.history.push("/blogs/edit/" + id);
  };

  handleUpdate = payload => {
    console.log(payload);
    blogService
      .updateBlog(this.state)
      .then(this.onUpdateSuccess)
      .catch(this.onErorr);
  };

  mapBlogs = blog => (
    <BlogCard
      blog={blog}
      key={blog.id}
      showBtn={true}
      handleEdit={this.editBlog}
      handleViewMore={this.viewFeatured}
    />
  );

  editedBlog = blog => (
    <EditBlog blog={blog} key={blog.id} handleUpdate={this.handleUpdate} />
  );

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <>
              {this.state.blogs.length > 0 ? (
                <BlogCard blog={this.state.blog} showBtn={false} />
              ) : null}
            </>
          </div>
          <div className="col-md-4">
            <BlogFeed
              mappedBlogs={this.state.mappedBlogs}
              firstPg={this.firstPg}
              previousButton={this.onPreviousButtonClick}
              nextButton={this.onNextButtonClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Blogs;
