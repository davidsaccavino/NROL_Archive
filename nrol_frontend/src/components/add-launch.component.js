import React, { Component } from 'react';
import LaunchDataService from "../services/launch.service";
export default class AddLaunch extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        }
    };

    componentDidMount(){
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveLaunch = this.saveLaunch.bind(this);
        this.newLaunch = this.newLaunch.bind(this);
    }

    onChangeTitle = e => {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        });
    }

    saveLaunch = () => {
        let data = {
            title: this.state.title,
            description: this.state.description
        };
        LaunchDataService.create(data)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    published: res.data.published,
                    submitted: true
                });
                console.log(res.data);
            })
            .catch(e => {
                console.log("FAILURE - Unable to create new Launch in MongoDB. ", e)
            });
    }

    newLaunch = () => {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        });
    }
    render(){
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button onClick={this.newLaunch} className="btn btn-success">
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <button onClick={this.saveLaunch} className="btn btn-success add-launch">
                        Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

