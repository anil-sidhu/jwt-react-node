import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://127.0.0.1:5000");
console.warn(socket)
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
    };
  }
  componentDidMount() {
    socket.on("new_message", data => {
      console.warn(data)
      this.setState({ response: data,msg: this.state.msg+ `<p>Hello ${data.message}</p>`})
    });
  }
  send(e) {
    socket.emit('new_message', { message: e.target.value, username: "anil" })
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
            Connected
              </p>
          : <p>Type for Connect</p>}
        <div>
          <input type="text" onChange={(e) => { this.send(e) }} />
        </div>
        <div dangerouslySetInnerHTML=
          {{
           __html: this.state.msg
          }}
        />
      </div>
    );
  }
}

export default App;