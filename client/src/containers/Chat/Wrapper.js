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

	emitterOrReceiverAttr(isOwnMessage) {
		if (isOwnMessage) return 'receiverId';

		return 'emmiterId';
	}

	receiveMessage() {
		socket.on('receive private message', (msg) => {
			const { usersMessages } = this.state;
			const isOwnMessage = msg.emmiterSocketId === socket.id;

			const alreadyHasMessages = usersMessages.some(x => x.conversationId === msg[this.emitterOrReceiverAttr(isOwnMessage)]);

			if (alreadyHasMessages) {
				this.populatePrivateMessages({ ...msg, isOwnMessage });
			} else {
				this.createNewPrivateMessage({ ...msg, isOwnMessage });
			}
		});
	}

	async createNewPrivateMessage({ message, nickname, isOwnMessage, ...rest }) {
		this.setState({
			usersMessages: [{
				conversationId: rest[this.emitterOrReceiverAttr(isOwnMessage)],
				...rest,
				messages: [{ nickname, message, }],
			}],
		});
	}

	populatePrivateMessages({ isOwnMessage, nickname, message, ...rest }) {
		const { usersMessages } = this.state;

		const messageIndex = usersMessages.findIndex(x => x.conversationId === rest[this.emitterOrReceiverAttr(isOwnMessage)]);
		const newUsersMessages = update(usersMessages, {
			[messageIndex]: {
				messages: { $push: [{ nickname, message, }] }
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