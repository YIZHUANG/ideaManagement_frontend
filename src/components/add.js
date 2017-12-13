import React, { Component } from "react";
import axios from "axios";
import { createHashHistory } from "history";
export const history = createHashHistory(); //import history for navigation.
export default class Add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ideaTitle: "",
      ideaOwnerid: "",
      description: "",
      budget: "",
      peopleNeeded: "",
      category: "",
      isReadyForComments: null,
      newIdeaId: ""
    };
  }

  ideaTitleOnchange(event) {
    this.setState({
      ideaTitle: event.target.value
    });
  }

  ideaOwnerOnchange(event) {
    this.setState({
      ideaOwnerid: event.target.value
    });
  }
  descriptionOnChange(event) {
    this.setState({
      description: event.target.value
    });
  }
  budgetOnChange(event) {
    this.setState({
      budget: event.target.value
    });
  }
  peopleNeededOnChange(event) {
    this.setState({
      peopleNeeded: event.target.value
    });
  }
  categoryOnChange(event) {
    this.setState({
      category: event.target.value
    });
  }
  isReadyForCommentsOnChange(event) {
    this.setState({
      isReadyForComments: event.target.value
    });
  }

  addIdea() {
    axios
      .post("http://localhost:8000/idea", {
        title: this.state.ideaTitle,
        description: this.state.description,
        budget: this.state.budget,
        peopleNeeded: this.state.peopleNeeded,
        categoryid: this.state.category,
        isReadyForComments: this.state.isReadyForComments,
        memberid: this.state.ideaOwnerid //memberId belongs to a different table,but the backend can redirect it to be insertd as well.
      })                                    //cool,right?
      .then(this.props.history.push("/"))
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <form>
        <label>Idea title:</label>
        <input
          type="text"
          value={this.state.ideaTitle}
          onChange={this.ideaTitleOnchange.bind(this)}
        />
        <br />
        <label>Idea owner:</label>
        <input
          value={this.state.ideaOwnerid}
          onChange={this.ideaOwnerOnchange.bind(this)}
        />
        <br />
        <label>Description:</label>
        <input
          value={this.state.description}
          onChange={this.descriptionOnChange.bind(this)}
        />
        <br />
        <label>Budget:</label>
        <input
          value={this.state.budget}
          onChange={this.budgetOnChange.bind(this)}
        />
        <br />
        <label>
          PeopleNeeded:
          <input
            value={this.state.peopleNeeded}
            onChange={this.peopleNeededOnChange.bind(this)}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            value={this.state.category}
            onChange={this.categoryOnChange.bind(this)}
          />
        </label>
        <br />
        <label>IsReadyForComments:</label>
        <input
          value={this.state.isReadyForComments}
          onChange={this.isReadyForCommentsOnChange.bind(this)}
        />
        <br />
        <input type="submit" value="Submit" onClick={this.addIdea.bind(this)} />
      </form>
    );
  }
}
