import React, { Component } from 'react';
import { compose, } from 'redux';
import { withRouter, } from 'react-router-dom';

// context
import withChat from './Context/withChat';

// components
import Chatbox from '../../components/DataDisplay/Chatbox';
import ChatInput from '../../components/DataEntry/ChatInput';

const INITIAL_STATE = {
	inputValue: '',
	userMessages: {
		messages: [],
	},
}

class ChatBoxContent extends Component {
	state = INITIAL_STATE

	componentDidMount() {
		this.getUserMessages();
	}

	componentDidUpdate(prevProps, prevState) {
		const { chatContext, match: { params }, } = this.props;

		if (params.id !== prevProps.match.params.id) {
			this.getUserMessages();
		}

		if (params.id === prevProps.match.params.id && this.checkIfUserHasMessages()) {
			if (
				this.findUserMessagesObject(chatContext.state.usersMessages).messages.length !==
				prevState.userMessages.messages.length
			) {
				this.setState({
					userMessages: { ...this.findUserMessagesObject(chatContext.state.usersMessages), }
				}, () => this.scrollToBottom());
			}
		}
	}

	scrollToBottom() {
		this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
	}

	getUserMessages() {
		const { chatContext, } = this.props;

		if (!this.checkIfUserHasMessages()) {
			this.setState(INITIAL_STATE);
			return;
		}

		const userMessages = this.findUserMessagesObject(chatContext.state.usersMessages);

		this.setState({
			userMessages
		});
	}

	checkIfUserHasMessages() {
		const { chatContext, match: { params }, } = this.props;

		return chatContext.state.usersMessages.some(x => x.conversationId === params.id);
	}

	findUserMessagesObject(userMessages) {
		const { match: { params }, } = this.props;

		return userMessages.filter(x => x.conversationId === params.id)[0];
	}

	handleKeyPress = event => {
		const { chatContext: { actions }, match: { params } } = this.props;

		if (event.key !== 'Enter' || !event.target.value) return;

		actions.sendMessage({
			message: event.target.value,
			receiverId: params.id,
		});

		this.setState({
			inputValue: ''
		});
	}

	render() {
		const { state, } = this;

		return (
			<React.Fragment>
				<Chatbox
					innerRef={element => this.messagesEnd = element}
				>
					{state.userMessages.messages.map((val, index) => (
						<Chatbox.Message
							key={index}
							message={val.message}
							nickname={val.nickname}
						/>
					))}
				</Chatbox>
				<Chatbox.Footer>
					<ChatInput
						value={state.inputValue}
						onChange={e => this.setState({ inputValue: e.target.value })}
						onKeyPress={e => this.handleKeyPress(e)}
					/>
				</Chatbox.Footer>
			</React.Fragment>
		)
	}
}

const enhance = compose(
	withRouter,
	withChat,
)

export default enhance(ChatBoxContent);