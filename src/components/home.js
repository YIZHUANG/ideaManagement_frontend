import React, { Component } from "react";
import axios from "axios";
import { HashRouter, Route, Router, Link } from "react-router-dom";
import Moment from "react-moment";
import { createHashHistory } from "history"; //import history for navigation.
export const history = createHashHistory();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfData: [], //the array where the data from axios get request will be stored
      comment: ""
    };
    this.getIdea = this.getIdea.bind(this);
  }

  componentDidMount() {
    this.getIdea(); //make the get request for getting the listOfIdeas
  }

  getIdea() {
    axios
      .get("/listData")
      .then(res => {
        this.setState({
          listOfData: res.data
        });
        console.log(res);
      })
      .catch(error => {});
  }

  updateIdea(id) {
    //pass the id of the idea to the edit form as well as redirecting to the edit page.
    this.props.history.push("/edit/" + id);
  }

  deleteIdea(id) {
    /* global location */
    /* eslint no-restricted-globals: ["off", "location"] */  //this is to disable the warning for using confirm function.
    if (confirm("Are you sure ?")) {
      var self = this;
      axios
        .delete("/idea/" + id)
        .then(function(response) {
          self.getIdea(); //update state in order to refresh the page to get updated data.
        })
        .catch(function(error) {});
    }
  }

  addComment(id) {
    this.props.history.push("/addComment/" + id);  //the same as for edit function, pass the id of the idea to addcomment form.
  }

  render() {
    return (
      <div className="container">
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation" class="active">
                <Link to="/">Home</Link>
              </li>
              <li role="presentation">
                <Link to="/add">Add</Link>
              </li>
              <li role="presentation">
                <Link to="/memberList">memberList</Link>
              </li>
            </ul>
          </nav>
          <h3 className="text-muted">Idea management</h3>
        </div>
        <div className="row">
          <div className="col-sm-1" />
          <div className="col-sm-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Idea owner</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>peopleNeeded</th>
                  <th>isReadyForComments</th>
                  <th>Comments</th>
                  <th>CreationDate</th>
                  <th>LastModified</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.listOfData.map(
                  function(listOfData, index) {
                    //mapping listOfideas into columns.
                    return (
                      <tr key={listOfData.id}>
                        <td>{listOfData.id}</td>
                        <td>{listOfData.title}</td>
                        <td>{listOfData.username}</td>
                        <td>{listOfData.name}</td>
                        <td>{listOfData.description}</td>
                        <td>{listOfData.peopleNeeded}</td>
                        <td>{listOfData.isReadyForComments ? "Yes" : "No"}</td>
                        <td>
                          {listOfData.comments.map((comments, index) => {
                            return (
                              <span>
                                {index + comments? index + 1 + ":" + comments: "No comments yet"}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          <Moment format="YYYY-MM-DD HH:mm">
                            {listOfData.creationDate}
                          </Moment>
                        </td>
                        <td>
                          <Moment format="YYYY-MM-DD HH:mm">
                            {listOfData.lastModified}
                          </Moment>
                        </td>
                        <td>
                          <span
                            onClick={this.updateIdea.bind(this, listOfData.id)}
                            className="glyphicon glyphicon-pencil"/>
                        </td>
                        <td>
                          <span
                            onClick={this.deleteIdea.bind(this, listOfData.id)}
                            className="glyphicon glyphicon-remove"/>
                        </td>
                        <td>
                          <span
                            className="glyphicon glyphicon-comment"
                            onClick={this.addComment.bind(this, listOfData.id)}/>
                        </td>
                      </tr>
                    );
                  }.bind(this)
                )}
              </tbody>
            </table>
          </div>
          <div className="col-sm-3" />
        </div>
      </div>
    );
  }
}
