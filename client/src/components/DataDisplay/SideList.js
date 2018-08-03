import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, } from 'react-router-dom';
import { REMOVE_ONLINE_USER, } from '../../redux/auth/types';

// socket
import socket from '../../utils/socket';

// react-router
import { Link } from 'react-router-dom';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, Input, } from 'rebass';

// components
import Avatar from './Avatar';
import MessageCounter from './MessageCounter';

// intern components
const BoxWrapper = styled(Flex)`
    display: flex;
    flex-direction: column;
		flex-shrink: 0;
		background-color: ${props => props.theme.colors.graydark};
		width: 15rem;
`;

const Header = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;

    padding: 0 0.625rem;
    color: white;
		box-shadow: ${props => props.theme.shadows.bottom};
		height: 3rem;
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

const SideListButton = styled(Link)`
		display: flex;	
		align-items: center;
		flex-shrink: 0;
		text-decoration: none;
		margin: 0.0625rem .5rem;
		padding: .3rem .5rem;
		border-radius: 3px;
		color: #fff;
		background-color: ${p => p.variant.isSelected ? p.theme.colors.graylight : 'transparent'};		

		&:hover {
			background-color: ${props => props.theme.colors.graysoft};
			opacity: 1;
		}

		& > span {
			flex: 1;
			overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
			opacity: .3;
		}
`;

const SideListText = styled.div`
		text-align: center;
		margin: 0.0625rem .5rem;
		padding: .3rem .5rem;
		color: #fff;
		opacity: .3;
`;

class SideList extends Component {
	state = {}

	componentDidMount() {
		this.getDisconnectedUser();
	}

	handleClickButton = (value) => {
		this.joinPrivateRoom(value);
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

	render() {
		const { onlineUsers, nickname, match: { params, } } = this.props;

		return (
			<BoxWrapper width={[2 / 12]}>
				<Header>
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
						<SideListText>
							Nobody is online :(
						</SideListText>
					}

					{onlineUsers.map((val, index) => (
						<SideListButton
							key={index}
							to={`/chat/${val._id}`}
							onClick={() => this.handleClickButton(val)}
							variant={{
								isSelected: val._id === params.id,
							}}
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
						</SideListButton>
					))}
				</Body>
				<Footer>
					<span>{nickname}</span>
				</Footer>
			</BoxWrapper>
		);
	}
}

SideList.propTypes = {
	nickname: PropTypes.string.isRequired,
	onlineUsers: PropTypes.array.isRequired,
}

export default withRouter(connect()(SideList));