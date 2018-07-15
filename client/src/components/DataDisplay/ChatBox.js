import React, { Component } from 'react';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, Text, } from 'rebass';

// components
import ChatBoxContent from './ChatBoxContent';

// intern components
const Wrapper = styled(Flex)`
		flex: 1;
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

const NoContentWrapper = styled(Flex)`
	flex: 1;
	text-transform: uppercase;
	color: ${props => props.theme.colors.grayxdark};
`;

class ChatBox extends Component {
	state = {
		messages: [],
		showChat: false,
		caching: {
			id: '',
		}
	}

	componentDidMount() {
		this.generateMessages();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { match: { params, } } = nextProps;

		if (params.id !== prevState.caching.id) {
			return {
				showChat: !!params.id,
				caching: {
					...prevState.caching,
					id: params.id,
				}
			}
		}

		return null;
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

	renderContent() {
		const { showChat, messages, } = this.state;
		
		if (showChat) {
			return (
				<ChatBoxContent 
					messages={messages}
				/>
			)
		}

		return (
			<NoContentWrapper
				alignItems="center"
				justifyContent="center"
			>
				<Text
					textAlign='center'
					fontWeight='bold'
					children='Lets chat!'
				/>
			</NoContentWrapper>
		)
	}

	render() {
		const { 
			showChat, 
			messages, 
			caching: { id },
		} = this.state;

		return (
			<Wrapper 
				width={[10 / 12]}
				flexDirection="column"
			>
				<Header>{showChat && `Chat's title ${id}`}</Header>
				{this.renderContent()}
			</Wrapper>
		);
	}
}

export default ChatBox;