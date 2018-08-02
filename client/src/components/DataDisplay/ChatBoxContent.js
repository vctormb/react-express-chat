import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom';

// context
import { ChatContext, } from '../../containers/Chat/Context/ChatContext';

// styled components
import styled from 'styled-components';

// components
import ChatBoxMessage from '../DataDisplay/ChatBoxMessage';
import ChatInput from '../DataEntry/ChatInput';

// intern components
const Body = styled.div`
    flex: 1;
    overflow-y: auto;
    color: white;

    ::-webkit-scrollbar {
        width: 6px;
    }
 
    ::-webkit-scrollbar-thumb {
			background-color: ${props => props.theme.colors.grayxdark};
    }
`;

const Footer = styled.div`
		margin: 0 1.25em;
    padding: 1.625rem 0;
    color: white;
    background-color: ${props => props.theme.colors.graylight};
		box-shadow: 0 -1px 0 hsla(0,0%,100%,.06);
`;

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
				<Body
					innerRef={element => this.messagesEnd = element}
				>
					{state.userMessages.messages.map((val, index) => (
						<ChatBoxMessage
							key={index}
							message={val.message}
							nickname={val.nickname}
						/>
					))}
				</Body>
				<Footer>
					<ChatInput
						value={state.inputValue}
						onChange={e => this.setState({ inputValue: e.target.value })}
						onKeyPress={e => this.handleKeyPress(e)}
					/>
				</Footer>
			</React.Fragment>
		)
	}
}

const withContextConsumer = props => (
	<ChatContext.Consumer>
		{context =>
			<ChatBoxContent {...props} chatContext={context} />
		}
	</ChatContext.Consumer>
);

export default withRouter(withContextConsumer);