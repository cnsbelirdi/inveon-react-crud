import { Component } from "react";
import TutorialService from "../services/TutorialService";
import { Link } from "react-router-dom";

class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: [],
      currentIndex: -1,
      currentTutorial: null,
    };
  }

  componentDidMount() {
    this.getTutorialsList();
  }

  getTutorialsList() {
    TutorialService.getAllTutorials()
      .then((tutorialList) => {
        this.setState({
          tutorials: tutorialList.data,
        });
      })
      .catch((error) => console.error(error));
  }

  activeTutorial(tutorial, index) {
    this.setState({
      ...this.state,
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  // Function to handle search input changes and update the list
  handleSearchChange = (e) => {
    const search = e.target.value; // Convert search input to lowercase for case-insensitive matching

    if (search === "") {
      this.getTutorialsList();
    } else {
      TutorialService.findByTitle(search)
        .then((tutorialList) => {
          if (Array.isArray(tutorialList.data)) {
            this.setState({
              tutorials: tutorialList.data,
            });
          } else {
            // Handle cases where the response is not an array
            console.error("Invalid response from the backend.");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  deleteTutorial(id) {
    this.setState({ ...this.state, currentIndex: -1 });
    if (
      id &&
      confirm("Are you sure you want to delete this tutorial?") === true
    ) {
      TutorialService.deleteTutorial(id)
        .then(() => {
          this.getTutorialsList();
        })
        .catch((error) => console.error(error));
    }
  }

  render() {
    const { tutorials, currentIndex } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="custom-card">
              <h1 className="card-title">Tutorials</h1>
              <div className="card-body mt-4">
                <form>
                  <input
                    type="text"
                    className="form-control add-task"
                    placeholder="Search"
                    onChange={this.handleSearchChange}
                  />
                </form>
                <div className="todo-list mt-4">
                  {tutorials.map((tutorial, index) => (
                    <div
                      key={index}
                      className={
                        "todo-item " + (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.activeTutorial(tutorial, index)}
                    >
                      <Link to={"/tutorial/" + tutorial.id}>
                        {tutorial.title}
                      </Link>
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <Link className="icon-link" to={"/edit/" + tutorial.id}>
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => this.deleteTutorial(tutorial.id)}
                        ></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorialsList;
