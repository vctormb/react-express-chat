import React, { Component } from 'react';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, } from 'rebass';

// components
import ChatInput from '../DataEntry/ChatInput';
import ChatBoxMessage from '../DataDisplay/ChatBoxMessage';

// intern components
const BoxWrapper = styled(Flex)`
    display: flex;
    flex-direction: column;
		background-color: ${props => props.theme.colors.graylight};
`;

const Header = styled.div`
		display: flex;
		align-items: center;

		height: 3rem;
		font-size: 1.125rem;
    padding: 0.8300em 0.625rem;
    color: white;
    box-shadow: ${props => props.theme.shadows.bottom};
		font-weight: ${props => props.theme.fontWeights.bold};
`;

const Body = styled.div`
    flex: 1;
    overflow-y: scroll;
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

class ChatBox extends Component {
	state = {
		messages: []
	}

	componentDidMount() {
		this.generateMessages();
	}

	generateMessages() {
		const arr = [];

		for (let i = 0; i < 20; i++) {
			arr.push(`message ${i + 1}`)
		}

		this.setState({
			messages: arr
		});
	}

	render() {
		return (
			<BoxWrapper width={[10 / 12]}>
				<Header>Chat's title</Header>
				<Body>
					{this.state.messages.map((val, index) => (
						<ChatBoxMessage
							key={index}
							message={val}
						/>
					))}
				</Body>
				<Footer>
					<ChatInput />
				</Footer>
			</BoxWrapper>
		);
	}
}

export default ChatBox;