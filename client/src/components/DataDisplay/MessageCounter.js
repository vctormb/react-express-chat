import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// context
import { ChatContext, } from '../../containers/Chat/Context/ChatContext';

// styled components
import styled from 'styled-components';
import { CLIENT_RENEG_WINDOW } from 'tls';

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

	componentDidUpdate(prevProps) {
		const { counter } = this.state;
		const { userId, match, chatContext, } = this.props;

		if (this.props.location !== prevProps.location) {
			this.hideCounter(match);
		}

		if (userId !== match.params.id) {
			if (this.findConversation(chatContext.state.usersMessages) &&
				this.findConversation(chatContext.state.usersMessages).unreadMessages !== counter) {
				this.startCounter();
			}
		}

		// if (userId === match.params.id) { << need to finish
		// 	if (this.findConversation() &&
		// 		this.findConversation(chatContext.state.usersMessages).length !==
		// 		this.findConversation(prevProps.chatContext.state.usersMessages).length) {
		// 		this.startCounter();
		// 	}
		// }
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

	hideCounter({ params }) {
		const { userId, chatContext, } = this.props;

		if (userId === params.id) {
			this.setState({ showCounter: false });
			chatContext.actions.resetUnreadMessages(userId);
		}
	}

	startCounter() {
		const { chatContext, } = this.props;
		const foundMessage = this.findConversation(chatContext.state.usersMessages);

		if (!foundMessage) return;

		this.setState({
			showCounter: foundMessage.unreadMessages !== 0,
			counter: foundMessage.unreadMessages
		});
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

const withContextConsumer = props => (
	<ChatContext.Consumer>
		{context =>
			<MessageCounter {...props} chatContext={context} />
		}
	</ChatContext.Consumer>
);

export default withRouter(withContextConsumer);