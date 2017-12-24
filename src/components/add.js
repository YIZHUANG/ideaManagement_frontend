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
      isReadyForComments: false,
      newIdeaId: "",
      categories: []
    };
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

  // Get request to get categories
  componentWillMount() {
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

  addIdea() {
    axios
      .post("http://localhost:8000/idea", {
        title: this.state.ideaTitle,
        description: this.state.description,
        budget: this.state.budget,
        peopleNeeded: this.state.peopleNeeded,
        categoryid: this.state.category || "1", //default categoryid is 1
        isReadyForComments: this.state.isReadyForComments || false, //default categoryid is false
        memberid: this.state.ideaOwnerid //memberId belongs to a different table,but the backend can redirect it to be insertd as well.
      }) //cool,right?
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
          name="ideaTitle"
          onChange={this.handleInputChange}
        />
        <br />
        <label>Idea owner:</label>
        <input
          type="text"
          name="ideaOwnerid"
          value={this.state.ideaOwnerid}
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
          name="budget"
          type="number"
          value={this.state.budget}
          onChange={this.handleInputChange}
        />
        <br />
        <label>
          PeopleNeeded:
          <input
            name="peopleNeeded"
            type="number"
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
          type="checkbox"
          name="isReadyForComments"
          value={this.state.isReadyForComments}
          onChange={this.handleInputChange}
        />
        <br />
        <input type="submit" value="Submit" onClick={this.addIdea.bind(this)} />
      </form>
    );
  }
}
