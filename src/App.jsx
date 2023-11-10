import "./App.css";
import { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import TutorialsList from "./components/TutorialsList";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import EditTutorial from "./components/EditTutorial";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand bg-dark navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              Inveon
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/tutorials"} className="nav-link">
                    Tutorial List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Add Tutorial
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList />}></Route>
            <Route path="/tutorials" element={<TutorialsList />}></Route>
            <Route path="/add" element={<AddTutorial />}></Route>
            <Route path="/edit/:id" element={<EditTutorial />}></Route>
            <Route path="/tutorial/:id" element={<Tutorial />}></Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
