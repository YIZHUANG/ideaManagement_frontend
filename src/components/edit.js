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
      listOfData: [],
      categories: []
    };
    this.getIdeaById = this.getIdeaById.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Updates the state when input field changes
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
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

  componentWillMount() {      // Get request to get categories
    axios
      .get("/category")
      .then(res => {
        this.setState({
          categories: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getIdeaById() {
    //get the list of ideas of which we are editting.
    var self = this;
    axios
      .get("http://localhost:8000/listData/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          listOfData: response.data
        });
      })
      .then(this.updateInput.bind(this))
      .catch(error => {
        console.log(error);
      });
  }

  updateInput() {
    //set the input value to the data we receive,which is the list of ideas we are modifying.
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
        memberid: this.state.memberid //even though memberid does not belong to the idea table, but the cool thing is
      }) //we have onUpdate('CASCADE') defined in the schema,so this will trigger another
      .then(this.props.history.push("/")) //post request in the back-end to set the owner of this idea.
      .catch(function(error) {
        console.log(error);
      });
  }

  // Map category names
  renderCategory = (elem, index) => (
    <option key={index} value={elem.id}>
      {elem.name}
    </option>
  );

  // Render all category names on list
  renderCategories = () => {
    return this.state.categories.map(this.renderCategory);
  };

  render() {
    return (
      <form>
        <label>Idea title:</label>
        <input
          type="text"
          name="ideaTitle"
          value={this.state.ideaTitle}
          onChange={this.handleInputChange}
        />
        <br />
        <label>Idea owner:</label>
        <input
          type="number"
          name="memberid"
          value={this.state.memberid}
          onChange={this.handleInputChange}
        />
        <br />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleInputChange}
        />
        <br />
        <label>Budget:</label>
        <input
          type="number"
          name="budget"
          value={this.state.budget}
          onChange={this.handleInputChange}
        />
        <br />
        <label>
          PeopleNeeded:
          <input
            type="number"
            name="peopleNeeded"
            value={this.state.peopleNeeded}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Category:
          <select name="category" onChange={this.handleInputChange}>
            {this.renderCategories()}
          </select>
        </label>
        <br />
        <label>IsReadyForComments:</label>
        <input
          name="isReadyForComments"
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
