import React, { Component } from 'react';

// context
import { ChatContext, } from '../../containers/Chat/Context/ChatContext';

// redux
import { connect } from 'react-redux';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, Text, Button, } from 'rebass';

// components
import ChatBoxContent from './ChatBoxContent';
import Icon from './Icon';

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

const SidebarButton = styled(Button)`
		display: none;
	  background: transparent;
    cursor: pointer;

		&:focus {
			box-shadow: none;
		}

		@media (max-width: 48em) {
			display: block;
		}
`;

const IconSidebarButton = styled(Icon)`
	display: flex;
	fill: ${props => props.theme.colors.graywhite};
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
		const { chatContext } = this.props;
		const {
			showChat,
			chatsTitle,
		} = this.state;

		return (
			<Wrapper
				width={[10 / 12]}
				flexDirection="column"
			>
				<Header>
					<SidebarButton
						onClick={() => chatContext.actions.showSideList(true)}
					>
						<IconSidebarButton
							viewBox="0 0 25 25"
							icon="menu"
							width="25"
							height="25"
						/>
					</SidebarButton>
					{showChat && chatsTitle}
				</Header>
				{this.renderContent()}
			</Wrapper>
		);
	}
}

const mapStateToProps = state => ({
	authReducer: state.auth,
});

const withContextConsumer = props => (
	<ChatContext.Consumer>
		{context =>
			<ChatBox {...props} chatContext={context} />
		}
	</ChatContext.Consumer>
);

export default connect(mapStateToProps)(withContextConsumer);