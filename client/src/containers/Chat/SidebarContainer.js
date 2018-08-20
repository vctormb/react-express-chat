import React, { Component } from 'react';
import { compose } from 'redux';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, } from 'react-router-dom';
import { REMOVE_ONLINE_USER, } from '../../redux/auth/types';

import withChat from './Context/withChat';

// socket
import socket from '../../utils/socket';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, Input, } from 'rebass';

// components
import Avatar from '../../components/DataDisplay/Avatar';
import MessageCounter from '../../components/DataDisplay/MessageCounter';
import Sidebar from '../../components/DataDisplay/Sidebar';

const Header = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;

    padding: 0 0.625rem;
    color: white;
		box-shadow: ${props => props.theme.shadows.bottom};
		height: 3rem;

		@media (max-width: 48em) {
			/* when sidelist is open on mobile devices */
			box-shadow: none;
		}
`;

const Body = styled(Flex)`
    flex: 1;
    padding-top: 1.25rem;
    overflow-y: auto;
    color: white;

    ::-webkit-scrollbar {
        width: 6px;
    }
 
    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.grayxdark};
    }
`;

const InputWrapper = styled.div`
	background-color: rgba(0,0,0,.2);
	border-radius: 4px;
	border: 1px solid rgba(0,0,0,.1);
	padding: 0.125rem;
	flex: 1;
`;

const CustomInput = styled(Input)`
	font-weight: 500;
`;

const Footer = styled(Flex)`
    padding: 0.9375rem 0.625rem;
    color: white;
    background-color: rgba(32,34,37,.3);
		font-size: 0.875rem;
		
		& > span {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
`;

const SidebarText = styled.div`
		text-align: center;
		margin: 0.0625rem .5rem;
		padding: .3rem .5rem;
		color: #fff;
		opacity: .3;
`;

class SidebarContainer extends Component {
	state = {}

	componentDidMount() {
		this.getDisconnectedUser();
	}

	handleClickButton = (value) => {
		this.joinPrivateRoom(value);
		this.showSidebar(false);
	}

	joinPrivateRoom = (value) => {
		socket.emit('join private room', {
			receiverId: value._id,
		});
	}

	getDisconnectedUser() {
		socket.on('disconnected user', ({ userId }) => {
			this.props.dispatch({
				type: REMOVE_ONLINE_USER.SUCCESS,
				userId,
			});
		});
	}

	showSidebar = (isOpen) => {
		const { chatContext } = this.props;

		chatContext.actions.showSideList(isOpen);
	}

	render() {
		const { chatContext, onlineUsers, nickname, match: { params, } } = this.props;

		return (
			<React.Fragment>
				<Sidebar.Manager show={chatContext.state.sideList.isOpen}>
					{sidebar => (
						<React.Fragment>
							<Sidebar.Backdrop
								show={sidebar.show}
								onClick={() => this.showSidebar(false)}
							/>
							<Sidebar
								width={[2 / 12]}
								variant={{
									showSideList: sidebar.show
								}}
							>
								<Header
									variant={{
										showSideList: sidebar.show
									}}
								>
									<InputWrapper>
										<CustomInput
											placeholder="Start a conversation"
											fontSize="0.75rem"
											py="5px"
											px="7px"
										/>
									</InputWrapper>
								</Header>
								<Body
									flexDirection="column"
								>
									{!onlineUsers.length &&
										<SidebarText>
											Nobody is online :(
										</SidebarText>
									}

									{onlineUsers.map((val, index) => (
										<Sidebar.Button
											key={index}
											to={`/chat/${val._id}`}
											onClick={() => this.handleClickButton(val)}
											isSelected={val._id === params.id}
										>
											<React.Fragment>
												<Avatar
													width="30px"
													height="30px"
													m="0 .75rem 0 0"
												/>
												<span>{val.nickname}</span>
												<MessageCounter
													userId={val._id}
												/>
											</React.Fragment>
										</Sidebar.Button>
									))}
								</Body>
								<Footer>
									<span>{nickname}</span>
								</Footer>
							</Sidebar>
						</React.Fragment>
					)}
				</Sidebar.Manager>
			</React.Fragment>
		);
	}
}

const enhance = compose(
	withRouter,
	withChat,
	connect()
)

SidebarContainer.propTypes = {
	nickname: PropTypes.string.isRequired,
	onlineUsers: PropTypes.array.isRequired,
}

export default enhance(SidebarContainer);