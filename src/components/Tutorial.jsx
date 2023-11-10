import { Component } from "react";
import TutorialService from "../services/TutorialService";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTutorial: {
        id: 0,
        title: "",
        description: "",
        created_date: "",
      },
    };
  }

  getTutorial(id) {
    TutorialService.getTutorial(id)
      .then((tutorial) => this.setState({ currentTutorial: tutorial.data }))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    const urlParts = window.location.href.split("/");
    const id = parseInt(urlParts[urlParts.length - 1], 10);
    this.getTutorial(id);
  }

  render() {
    return (
      <div className="card col-md-6">
        <h5 className="card-header">{this.state.currentTutorial.title}</h5>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">{this.state.currentTutorial.description}</p>
        </div>
        <div className="card-footer text-body-secondary">
          {this.state.currentTutorial.created_date}
        </div>
      </div>
    );
  }
}
