import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

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
    padding: 0.8300rem 0.625rem;
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
		chatsTitle: '',
		showChat: false,
		caching: {
			id: '',
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { match: { params, }, authReducer, } = nextProps;
		if (params.id && params.id !== prevState.caching.id) {
			return {
				showChat: !!params.id,
				chatsTitle: authReducer.onlineUsers.filter(x => x._id === params.id)[0].nickname,
				caching: {
					...prevState.caching,
					id: params.id,
				}
			}
		}

		return null;
	}

	renderContent() {
		const { showChat, } = this.state;

		if (showChat) {
			return (
				<ChatBoxContent />
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
					children='Click a friend to chat in private!'
				/>
			</NoContentWrapper>
		)
	}

	render() {
		const {
			showChat,
			chatsTitle,
		} = this.state;

		return (
			<Wrapper
				width={[10 / 12]}
				flexDirection="column"
			>
				<Header>{showChat && chatsTitle}</Header>
				{this.renderContent()}
			</Wrapper>
		);
	}
}

const mapStateToProps = state => ({
	authReducer: state.auth,
});

export default connect(mapStateToProps)(ChatBox);