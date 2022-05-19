import React, { Component } from "react";
import LaunchDataService from "../services/launch.service";

export default class Launch extends Component {
  constructor(props) {
    super(props);
    this.getLaunch = this.getLaunch.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateLaunch = this.updateLaunch.bind(this);
    this.deleteLaunch = this.deleteLaunch.bind(this);
    this.state = {
      currentLaunch: {
        // grabs the id of the Launch from the url
        _id: window.location.href.split("/")[4] == "list" ? "" : window.location.href.split("/")[4],
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }


  componentDidMount() {
    this.setState({  currentLaunch: {...this.state.currentLaunch, _id: window.location.href.split("/")[4]} });
    this.getLaunch(this.state.currentLaunch._id);
  }
  

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function(prevState) {
      return {
        currentLaunch: {
          ...prevState.currentLaunch,
          title: title
        }
      };
    });
  }


  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentLaunch: {
        ...prevState.currentLaunch,
        description: description
      }
    }));
  }


  getLaunch(id) {
    LaunchDataService.get(id)
      .then(response => {
        this.setState({
          currentLaunch: response.data
        });
      })
      .catch(err => {
        console.log(`FAILURE - An error occured while using the getLaunch() function in launch.component.js.\n${err}`);
      });
  }


  updatePublished(status) {
    var data = {
      id: this.state.currentLaunch._id,
      title: this.state.currentLaunch.title,
      description: this.state.currentLaunch.description,
      published: status
    };
    LaunchDataService.update(this.state.currentLaunch._id, data)
      .then(() => {
        this.setState(prevState => ({
          currentLaunch: {
            ...prevState.currentLaunch,
            published: status
          }
        }));
      })
      .catch(err => {
        console.log(`FAILURE - An error occured while using the updatePublished() function in launch.component.js.\n${err}`);
      });
  }


  updateLaunch() {
    LaunchDataService.update(
      this.state.currentLaunch._id,
      this.state.currentLaunch
    )
      .then(() => {
        this.setState({
          message: "The launch was updated successfully!"
        });
      })
      .catch(err => {
        console.log(`FAILURE - An error occured while using the updateLaunch() function in launch.component.js.\n${err}`);
      });
  }


  deleteLaunch() {  
    console.log(this.state.currentLaunch._id);
    LaunchDataService.delete(this.state.currentLaunch._id)
      .then(response => {
        console.log(response.data);
      })
      .catch(err=> {
        console.log(`FAILURE - An error occured while using the deleteLaunch() function in launch.component.js.\n${err}`);
      });
  }
  
  render() {
    const { currentLaunch } = this.state;
    return (
      <div>
        {currentLaunch ? (
          <div className="edit-form">
            <h4>Launch</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentLaunch.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentLaunch.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentLaunch.published ? "Published" : "Pending"}
              </div>
            </form>
            {currentLaunch.published ? (
              <button
                className="badge btn-primary mr-2 edit-options"
                onClick={() => this.updatePublished(false)}
              >
                Unpublish
              </button>
            ) : (
              <button
                className="badge btn-primary mr-2 edit-options"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}
            
            <button
              type="submit"
              className="badge btn-success edit-options"
              onClick={this.updateLaunch}
            >
              Update
            </button>
            <button
              className="badge btn-danger mr-2 edit-options"
              onClick={this.deleteLaunch}
            >
              Delete
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a Launch...</p>
          </div>
        )}
      </div>
    );
  }
}