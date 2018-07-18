import React, { Component } from 'react';
import { Route, } from "react-router-dom";

// redux
import { connect } from 'react-redux';

// socket
import socket from '../../utils/socket';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, } from 'rebass';

// components
import SideList from '../../components/DataDisplay/SideList';
import ChatBox from '../../components/DataDisplay/ChatBox';

const FlexWrapper = styled(Flex)`
    flex: 1;
`;

class Wrapper extends Component {
	state = {}

	render() {
		const { authReducer: { onlineUsers, user, } } = this.props;

		return (
			<FlexWrapper mx={0}>
				<SideList
					nickname={user.data.nickname}
					onlineUsers={onlineUsers}
				/>
				<Route
					path="/chat/:id?"
					component={ChatBox}
				/>
			</FlexWrapper>
		);
	}
}

const mapStateToProps = state => ({
	authReducer: state.auth,
});

export default connect(mapStateToProps)(Wrapper);