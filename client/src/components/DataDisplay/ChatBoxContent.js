import React, { Component } from 'react';

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

class ChatBoxContent extends Component {
	state = {};

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		const { messages } = this.props;

		if (messages.length) {
			this.scrollToBottom();
		}
	}

	scrollToBottom() {
		this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
	}

	render() {
		const { messages } = this.props;

		return (
			<React.Fragment>
				<Body
					innerRef={element => this.messagesEnd = element}
				>
					{messages.map((val, index) => (
						<ChatBoxMessage
							key={index}
							message={val}
						/>
					))}
				</Body>
				<Footer>
					<ChatInput />
				</Footer>
			</React.Fragment>
		)
	}
}

export default ChatBoxContent;