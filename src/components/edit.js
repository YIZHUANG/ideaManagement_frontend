import React, { Component } from "react";
import axios from "axios";
import { HashRouter, Route, Router, Link } from "react-router-dom";
import { createHashHistory } from "history"; //import history for navigation.
export const history = createHashHistory();

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaId: "",
      ideaTitle: "",
      memberid: "",
      description: "",
      budget: "",
      peopleNeeded: "",
      category: "",
      isReadyForComments: null,
      listOfData: []
    };
    this.getIdeaById = this.getIdeaById.bind(this);
  }

  ideaTitleOnchange(event) {
    this.setState({
      ideaTitle: event.target.value
    });
  }

  ideaOwnerOnchange(event) {
    this.setState({
      memberid: event.target.value
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

  componentDidMount() {
    //get the id of the need-to-be-edited-item from router's the histroy push.
    this.setState({ ideaId: this.props.match.params.id }); //this.props.match.params.id is the idea we pass onto in the previous page.
    console.log(this.props.match.params.id);
    this.getIdeaById();
  }

  getIdeaById() {                 //get the list of ideas of which we are editting.
    var self = this;
    axios
      .get("http://localhost:8000/listData/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          listOfData: response.data
        });
      })
      .then(this.updateInput.bind(this))
      .catch(error => {});
  }

  updateInput() {     //set the input value to the data we receive,which is the list of ideas we are modifying.
    this.setState({
      ideaTitle: this.state.listOfData[0].title,
      description: this.state.listOfData[0].description,
      budget: this.state.listOfData[0].budget,
      peopleNeeded: this.state.listOfData[0].peopleNeeded,
      memberid: this.state.listOfData[0].memberid,
      category: this.state.listOfData[0].categoryid,
      isReadyForComments: this.state.listOfData[0].isReadyForComments
    });
  }

  editIdea() {
    //update query
    axios
      .put("http://localhost:8000/idea/" + this.state.ideaId, {
        title: this.state.ideaTitle,
        description: this.state.description,
        budget: this.state.budget,
        peopleNeeded: this.state.peopleNeeded,
        categoryid: this.state.category,
        isReadyForComments: this.state.isReadyForComments,
        memberid: this.state.memberid   //even though memberid does not belong to the idea table, but the cool thing is
      })                               //we have onUpdate('CASCADE') defined in the schema,so this will trigger another
      .then(this.props.history.push("/"))     //post request in the back-end to set the owner of this idea.
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
          value={this.state.memberid}
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
        <input
          type="submit"
          value="Submit"
          onClick={this.editIdea.bind(this)}
        />
      </form>
    );
  }
}
