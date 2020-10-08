import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client_id: "75b551c408d5cba2ffb1",
      client_secret: "6fe041af5cb0f368aeefcebc77e89c021c4a0126",
      user: "",
      name: "",
      bio: "",
      email: "",
      public_repos: "",
      avatar_url: "",
      error: undefined,
    };
  }

  apiCall = async () => {
    try {
      if (this.state.user) {
        const response = await axios.get(
          `https://api.github.com/users/${this.state.user}?client_id=${this.state.client_id}&client_secret=${this.state.client_secret}`
        );
        const data = response.data;
        console.log(data);
        this.setState({
          name: data.name,
          bio: data.bio,
          email: data.email,
          public_repos: data.public_repos,
          avatar_url: data.avatar_url,
          error: "",
        });
      } else {
        this.setState({
          error: "Enter Username first!! ",
        });
      }
    } catch (err) {
      this.setState({ error: "Users not found" });
    }
  };

  onChangeHandler = (e) => {
    this.setState({ user: e.target.value });
  };

  onSubmitHandler = () => {
    this.apiCall();
  };

  onRefresh = () => {
    window.location.reload(false);
  };

  render() {
    const {
      name,
      bio,
      email,
      public_repos,
      avatar_url,
      error,
      user,
    } = this.state;
    let data;
    if (error !== undefined && name !== "") {
      data = (
        <div className="row">
          <div className="col-4">
            <img
              src={avatar_url}
              alt=""
              className="ml-3 "
              style={{ width: "60px" }}
            />
          </div>
          <div className="col-8">
            <p>Name: {name}</p>
            <p>Bio: {bio}</p>
            <p>Email: {email}</p>
            <p>Public Repos: {public_repos}</p>
          </div>
        </div>
      );
    } else {
      data = <div className="error">{error}</div>;
    }

    return (
      <div className="card m-4 mx-auto ">
        <div className="card-header text-center">
          <h1 className="card-title">Github User Search</h1>
          <input
            className=" form-control"
            type="text"
            onChange={(e) => {
              this.onChangeHandler(e);
            }}
          />
          <br />
          <button
            className="btn btn-success mb-1 mr-2"
            type="submit"
            onClick={this.onSubmitHandler}
          >
            Search
          </button>
          <button
            className="btn btn-primary mb-1 "
            type="submit"
            onClick={this.onRefresh}
          >
            Refresh
          </button>
        </div>
        <div className="card-body">{data}</div>
      </div>
    );
  }
}

export default App;
