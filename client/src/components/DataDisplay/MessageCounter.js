import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// context
import withChat from '../../containers/Chat/Context/withChat';

// styled components
import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: #f04747;
	padding: 0.1875rem 0.375rem;
	font-size: 0.75rem;
	border-radius: 3px;
	line-height: 12px;
	font-weight: 500;
`;

const INITIAL_STATE = {
	showCounter: false,
	counter: 0,
}

class MessageCounter extends Component {
	state = INITIAL_STATE;

	componentDidUpdate() {
		const { counter } = this.state;
		const { userId, match, chatContext, } = this.props;

		if (userId !== match.params.id) {
			if (this.findConversation(chatContext.state.usersMessages) &&
				this.findConversation(chatContext.state.usersMessages).unreadMessages !== counter) {
				this.showCounter();
			}
		}

		if (userId === match.params.id) {
			if (this.findConversation(chatContext.state.usersMessages) &&
				this.findConversation(chatContext.state.usersMessages).unreadMessages !== 0
			) {
				this.hideCounter();
			}
		}
	}

	findConversation(usersMessages) {
		const { userId, } = this.props;

		return usersMessages
			.filter(x => x.conversationId === userId)[0];
	}

	checkNewMessages() {
		const { chatContext, } = this.props;
		const foundMessage = this.findConversation(chatContext.state.usersMessages);

		if (!foundMessage) return;

		this.setState({
			counter: foundMessage.unreadMessages,
		});
	}

	showCounter() {
		const { chatContext, } = this.props;
		const foundMessage = this.findConversation(chatContext.state.usersMessages);

		if (!foundMessage) return;

		this.setState({
			showCounter: foundMessage.unreadMessages !== 0,
			counter: foundMessage.unreadMessages
		});
	}

	hideCounter() {
		const { userId, chatContext, } = this.props;

		this.setState({ showCounter: false });
		chatContext.actions.resetUnreadMessages(userId);
	}

	render() {
		if (this.state.showCounter) {
			return (
				<Wrapper>
					{this.state.counter}
				</Wrapper>
			);
		}

		return null;
	}
}

MessageCounter.propTypes = {
	userId: PropTypes.string.isRequired,
}

const enhance = compose(
	withRouter,
	withChat,
)

export default enhance(MessageCounter);