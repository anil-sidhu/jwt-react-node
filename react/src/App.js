import React, { Component } from 'react';
class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
      post: null,
    }
  }
  componentDidMount() {
    console.warn("local data")
    let store = JSON.parse(localStorage.getItem('login'))
    this.setState({ login: store })
  }
  login() {
    fetch("http://127.0.0.1:5000/api/login",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(this.state)
      })
      .then(function (res) {
        res.json().then((result) => {
          localStorage.setItem('login', JSON.stringify({ login: true, token: result.token }))
          console.warn(result);

        })

      })
  }
  post(e) {
    let token = "Bearer " + this.state.login.token;
    fetch("http://127.0.0.1:5000/api/posts",
      {
        headers: {
          'Authorization': token,
        },
        method: "POST",
        body: e.target.value
      })
      .then((res) => {
        res.json().then((result) => {
          this.setState({ post: result.message })
          console.warn(result);
        })
      })
  }
  render() {
    return (
      <div>
        {!this.state.login ?
          <div>
            <h1> Login </h1>
            <input type="text" onChange={(e) => { this.setState({ name: e.target.value }) }} />
            <br />
            <input type="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
            <br />
            <button onClick={() => { this.login() }}>Login</button>
          </div>
          : <div>
            <textarea />
            <br />
            <button onClick={(e) => { this.post(e) }}>Make A Post</button>

            <hr />
            {this.state.post}
            <hr />
          </div>
        }

      </div>
    );
  }
}

export default App;