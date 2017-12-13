import React, { Component } from "react";
import axios from "axios";
import { HashRouter, Route, Router, Link } from "react-router-dom";

export default class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMembers: []
    };
  }

  componentDidMount() {
    //Requests Members data when page has loaded
    axios
      .get("/member")
      .then(res => {
        this.setState({
          listOfMembers: res.data
        });
        console.log(this.state.listOfMembers);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div class="header clearfix">
          <nav>
            <ul class="nav nav-pills pull-right">
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
          <h3 class="text-muted">Members management</h3>
        </div>
        <div className="row">
          <div className="col-sm-4" />
          <div className="col-sm-4">
            <table className="table table-striped table-hover table-responsive">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listOfMembers.map(
                  function(listOfMembers, index) {
                    return (
                      <tr key={listOfMembers.id}>
                        <td>{listOfMembers.id}</td>
                        <td>{listOfMembers.username}</td>
                        <td>{listOfMembers.email}</td>
                      </tr>
                    );
                  }.bind(this)
                )}
              </tbody>
            </table>
          </div>
          <div className="col-sm-4" />
        </div>
      </div>
    );
  }
}
