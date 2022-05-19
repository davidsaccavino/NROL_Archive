import React, { Component } from "react";
import LaunchDataService from "../services/launch.service";
import { Link } from "react-router-dom";


export default class LaunchList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.removeAllLaunches = this.removeAllLaunches.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.retrieveLaunches = this.retrieveLaunches.bind(this);
    this.setActiveLaunches = this.setActiveLaunches.bind(this);
    this.searchHelperFunction = this.searchHelperFunction.bind(this);
    this.state = {
      launches: [],
      currentLaunch: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  // Retrieve list of launches as soon as the component is done mounting.
  componentDidMount() {
    this.retrieveLaunches();
  }


  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  // Retrieve an up-to-date list of all launches
  retrieveLaunches() {
    LaunchDataService.getAll()
      .then(response => {
        this.setState({
          launches: response.data
        });
      })
      .catch(err => {
        console.log(`FAILURE - An error occured while using the retrieveLaunches() function in launch-list.component.js\n${err}`);
      });
  }


  // Retrieve an up-to-date list of all launches and reset the "active" launch parameters
  refreshList() {
    this.retrieveLaunches();
    this.setState({
      currentLaunch: null,
      currentIndex: -1
    });
  }


  searchHelperFunction() {
    let localLaunchList;
    
    // Make a local list of all launches without updating this.state.launches
    LaunchDataService.getAll()
      .then(response => {
        localLaunchList = response.data;

        this.searchTitle();


        // Iterate over the local list of all launches and set the searched launch to "active"
        localLaunchList.map((launch) => {

          if(launch.title == this.state.searchTitle){
            this.setActiveLaunches(launch, 0);
          }
        })
      })      
      .catch(err => {
        console.log(`FAILURE - An error occured while using the searchHelperFunction() function in launch-list.component.js\n${err}`);
      });
    
  }

  // Set the selected launch to "active"
  setActiveLaunches(launch, index) {
    this.setState({
      currentLaunch: launch,
      currentIndex: index
    });
  }

  // This should be very obvious, I hope
  removeAllLaunches() {
    LaunchDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch(err => {
        console.log(`FAILURE - An error occured while using the removeAllLaunches() function in launch-list.component.js\n${err}`);
      });
  }


  searchTitle() {
    LaunchDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          launches: response.data,
        });
      })
      .catch(err => {
        console.log(`FAILURE - An error occured while using the searchTitle() function in launch-list.component.js.\n${err}`);
      });
  }
  
  render() {
    const { searchTitle, launches, currentLaunch, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchHelperFunction}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Launch List</h4>
          <ul className="list-group">
            {launches &&
              launches.map((launches, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveLaunches(launches, index)}
                  key={index}
                >
                  {launches.title}
                </li>
              ))}
          </ul>
          <Link to="/add" className="m-3 btn btn-sm btn-success">
              Add
          </Link>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllLaunches}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentLaunch ? (
            <div>
              <h4>Launch</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentLaunch.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentLaunch.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentLaunch.published ? "Published" : "Pending"}
              </div>
              <Link
                to={"/launches/" + currentLaunch._id}
                className="badge btn-success"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please select a Launch</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
