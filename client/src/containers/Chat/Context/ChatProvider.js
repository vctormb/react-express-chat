import React from 'react';
import update from 'immutability-helper';

// redux
import { connect } from 'react-redux';
import { NEW_ONLINE_USER, } from '../../../redux/auth/types';

// context
import { ChatContext, } from './ChatContext';

// socket
import socket from '../../../utils/socket';


class ChatProvider extends React.Component {
	state = {
		usersMessages: [],
		sideList: {
			isOpen: false,
		},
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
			usersMessages: this.state.usersMessages.concat({
				conversationId: rest[this.emitterOrReceiverAttr(isOwnMessage)],
				...rest,
				messages: [{ nickname, message, }],
				unreadMessages: 1,
			}),
		});
	}

	populatePrivateMessages({ isOwnMessage, nickname, message, ...rest }) {
		const { usersMessages } = this.state;

		const messageIndex = usersMessages.findIndex(x => x.conversationId === rest[this.emitterOrReceiverAttr(isOwnMessage)]);
		const foundMessage = usersMessages.filter(x => x.conversationId === rest[this.emitterOrReceiverAttr(isOwnMessage)])[0];

		const newUsersMessages = update(usersMessages, {
			[messageIndex]: {
				messages: {
					$push: [{
						nickname, message,
					}]
				},
				unreadMessages: { $set: foundMessage.unreadMessages + 1 },
			}
		});

		this.setState({
			usersMessages: newUsersMessages
		});
	}

	resetUnreadMessages = (conversationId) => {
		const { usersMessages } = this.state;

		const messageIndex = usersMessages.findIndex(x => x.conversationId === conversationId);

		if (messageIndex === -1) return;

		const resetedCounter = update(usersMessages, {
			[messageIndex]: {
				unreadMessages: { $set: 0 },
			}
		});

		this.setState({
			usersMessages: resetedCounter
		});
	}

	showSideList = (isOpen) => {
		this.setState({
			sideList: {
				...this.state.sideList,
				isOpen,
			}
		});
	}

	render() {
		return (
			<ChatContext.Provider value={{
				state: this.state,
				actions: {
					sendMessage: this.sendMessage,
					resetUnreadMessages: this.resetUnreadMessages,
					showSideList: this.showSideList,
				}
			}}>
				{this.props.children}
			</ChatContext.Provider>
		)
	}
}

const mapStateToProps = state => ({
	authReducer: state.auth,
});

export default connect(mapStateToProps)(ChatProvider);