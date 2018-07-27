import React, { Component } from 'react';
import { Route, } from "react-router-dom";
import update from 'immutability-helper';

// redux
import { connect } from 'react-redux';

// context
import { ChatContext, } from './Context/ChatContext';

// socket
import socket from '../../utils/socket';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, } from 'rebass';

// components
import SideList from '../../components/DataDisplay/SideList';
import ChatBox from '../../components/DataDisplay/ChatBox';

// redux types
import { NEW_ONLINE_USER, } from '../../redux/auth/types';

const FlexWrapper = styled(Flex)`
    flex: 1;
`;

class Wrapper extends Component {
	state = {
		usersMessages: [],
	}

	componentDidMount() {
		this.receiveMessage();
		this.receiveNewOnlineUser();
	}

	receiveNewOnlineUser() {
		socket.on('new online user', (newOnlineUser) => {
			this.props.dispatch({
				type: NEW_ONLINE_USER.SUCCESS,
				newOnlineUser,
			});
		});
	}

	sendMessage = ({ message, receiverId }) => {
		socket.emit('send private message', { message, receiverId });
	}

	receiveMessage() {
		socket.on('receive private message', (msg) => {
			const { usersMessages } = this.state;
console.log('== // ==')
console.log(msg)
			const alreadyHasMessages = usersMessages.some(x => x.emmiterId === msg.emmiterId);

			if (alreadyHasMessages) {
				this.populatePrivateMessages(msg)
			} else {
				this.createNewPrivateMessage(msg);
			}
		});
	}

	createNewPrivateMessage({ message, ...rest }) {
		this.setState({
			usersMessages: [{
				...rest,
				messages: [{
					message,
				}]
			}],
		});
	}

	populatePrivateMessages({ emmiterId, message, ...rest }) {
		const { usersMessages } = this.state;

		const messageIndex = usersMessages.findIndex(x => x.emmiterId === emmiterId);
		const newUsersMessages = update(usersMessages, {
			[messageIndex]: {
				messages: { $push: [{ message }] }
			}
		});

		this.setState({
			usersMessages: newUsersMessages
		});
	}

	render() {
		const { authReducer: { onlineUsers, user, } } = this.props;

		return (
			<ChatContext.Provider value={{
				state: this.state,
				actions: {
					sendMessage: this.sendMessage,
				}
			}}>
				<FlexWrapper mx={0}>
					<SideList
						nickname={user.data.nickname}
						onlineUsers={onlineUsers}
					/>
					<Route
						path="/chat/:id?"
						component={ChatBox}
					/>
				</FlexWrapper>
			</ChatContext.Provider>
		);
	}
}

const mapStateToProps = state => ({
	authReducer: state.auth,
});

export default connect(mapStateToProps)(Wrapper);