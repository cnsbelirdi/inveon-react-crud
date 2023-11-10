import { Component } from "react";
import TutorialService from "../services/TutorialService";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTutorial: {
        title: "",
        description: "",
      },
    };
  }

  saveTutorial(e) {
    e.preventDefault();
    const { currentTutorial } = this.state;
    if (currentTutorial.title != "" && currentTutorial.description != "") {
      TutorialService.addTutorial({
        title: currentTutorial.title,
        description: currentTutorial.description,
      })
        .then(() => {
          document.querySelector(".alert").classList.remove("d-none");
          this.setState({
            currentTutorial: { title: "", description: "" },
          });
        })
        .catch((error) => console.error(error));
    }
  }

  render() {
    const { currentTutorial } = this.state;
    return (
      <div className="container w-50 custom-card">
        <form>
          <h1>Add a new tutorial</h1>
          <div className="input-group mb-3 mt-3">
            <span className="input-group-text" id="title">
              Title
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="title"
              aria-describedby="title"
              value={currentTutorial.title}
              onChange={(e) =>
                this.setState({
                  currentTutorial: {
                    ...currentTutorial,
                    title: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="description">
              Description
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="description"
              aria-describedby="description"
              value={currentTutorial.description}
              onChange={(e) =>
                this.setState({
                  ...this.state,
                  currentTutorial: {
                    ...currentTutorial,
                    description: e.target.value,
                  },
                })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => this.saveTutorial(e)}
          >
            Add
          </button>
          <div
            className="alert alert-success alert-dismissible fade show mt-4 d-none"
            role="alert"
          >
            <strong>New tutorial added successfully!</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </form>
      </div>
    );
  }
}
