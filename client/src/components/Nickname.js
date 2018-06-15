import React, { Component } from 'react';

// socket
import socket from '../utils/socket';

export default class Nickname extends Component {
    state = {
        nickname: ''
    }

    joinRoom = () => {
        const { nickname } = this.state;

        if (!nickname) return;

        if (this.props.joinRoom) {
            this.props.joinRoom(nickname);
        }
    }

    render() {
        return (
            <React.Fragment>
                <input
                    placeholder="nickname"
                    value={this.state.nickname}
                    onChange={(e) => this.setState({ nickname: e.target.value })}
                />
                <button onClick={this.joinRoom}>ok</button>
            </React.Fragment>
        );
    }
}