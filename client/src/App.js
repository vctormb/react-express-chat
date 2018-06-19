import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// components
import Nickname from './components/Nickname';

// socket
import socket from './utils/socket';

class App extends Component {
  state = {
    message: '',
    chat: [],
    onlineUsers: [],
    showNickname: true,
  }

  componentDidMount() {
    this.getChatAndUsers();
    this.addOnlineUser();
    this.getDisconnectedUser();
  }


  getChatAndUsers() {
    socket.on('chat message', (data) => {
      this.setState({
        chat: this.state.chat.concat(data)
      });
    });
  }

  addOnlineUser() {
    socket.on('added user', (data) => {
      this.setState({
        onlineUsers: data.onlineUsers
      });
    });
  }

  getDisconnectedUser() {
    socket.on('disconnected user', ({ socketId }) => {
      this.setState({
        onlineUsers: this.state.onlineUsers.filter(val => val.socketId !== socketId)
      });
    });
  }

  sendMessage = (e) => {
    const { message, } = this.state;

    if (!message || e.key !== 'Enter') return;

    socket.emit('chat message', { message });

    this.setState({ message: '' });
  }

  renderChatMessages() {
    return this.state.chat.map((val, index) => (
      <p key={index}>{val.nickname}: {val.message}</p>
    ))
  }

  renderOnlineUsers() {
    return this.state.onlineUsers.map((val, index) => (
      <p key={index}>{val.nickname}</p>
    ))
  }

  joinRoom = (nickname) => {
    socket.emit('join user', { nickname });
    this.setState({ showNickname: false });
  }

  render() {
    return (
      <div className="App">
        <strong>CHAT:</strong>
        <br />
        <br />

        {this.renderChatMessages()}

        <br />
        <br />

        {
          this.state.showNickname && (
            <Nickname
              joinRoom={this.joinRoom}
            />
          )
        }

        <br />

        {
          !this.state.showNickname && (
            <React.Fragment>
              <input
                placeholder="message"
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
                onKeyPress={this.sendMessage}
              />

              <br />
              <button onClick={this.sendMessage}>Send</button>
            </React.Fragment>
          )
        }

        <br />
        <br />
        <strong>Online Users:</strong>
        {this.renderOnlineUsers()}
      </div>
    );
  }
}

export default App;
