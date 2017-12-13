import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import MemberList from "./components/memberList";
import Add from "./components/add";
import Edit from "./components/edit";
import CommentForm from './components/commentForm';
import { HashRouter, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/memberList" component={MemberList} />
        <Route exact path="/add" component={Add} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/addComment/:id" component={CommentForm} />
      </Switch>
    );
  }
}

export default App;
