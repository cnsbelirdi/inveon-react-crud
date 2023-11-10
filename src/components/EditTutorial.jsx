import { Component } from "react";
import TutorialService from "../services/TutorialService";

export default class EditTutorial extends Component {
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

  editTutorial(e) {
    e.preventDefault();
    const { currentTutorial } = this.state;
    if (currentTutorial.title != "" && currentTutorial.description != "") {
      TutorialService.updateTutorial({
        id: currentTutorial.id,
        title: currentTutorial.title,
        description: currentTutorial.description,
        created_date: currentTutorial.created_date,
      })
        .then(() => {
          document.querySelector(".alert").classList.remove("d-none");
        })
        .catch((error) => console.error(error));
    }
  }

  render() {
    const { currentTutorial } = this.state;
    return (
      <div className="container w-50 custom-card">
        <form>
          <h1>Edit tutorial</h1>
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
            onClick={(e) => this.editTutorial(e)}
          >
            Edit
          </button>
          <div
            className="alert alert-success alert-dismissible fade show mt-4 d-none"
            role="alert"
          >
            <strong>Tutorial updated successfully!</strong>
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
