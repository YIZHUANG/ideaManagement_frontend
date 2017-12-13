import React, { Component } from "react";
import axios from "axios";
import { createHashHistory } from "history";
export const history = createHashHistory(); //import history for navigation.

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentline: "",
      ideaId: ""
    };
  }

  componentDidMount() {
    //get the id of the need-to-be-edited-item from router's the histroy push.
    this.setState({ ideaId: this.props.match.params.id }); //this.props.match.params.id is the idea we pass onto in the previous page.
    console.log(this.props.match.params.id);
  }

  onCommentChange(event) {
    this.setState({
      commentline: event.target.value
    });
  }

  saveComment() {
    axios
      .post("/comment/" + this.state.ideaId, {    //this will append the commentline to our comment Array which is defined in the featuresApi.js in back-end file.
        commentline: this.state.commentline
      })
      .then(this.props.history.push("/"))
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <form>
        <label>Your comment:</label>
        <input
          value={this.state.commentline}
          onChange={this.onCommentChange.bind(this)}
        />
        <br />
        <input
          type="submit"
          value="Submit"
          onClick={this.saveComment.bind(this)}
        />
      </form>
    );
  }
}
