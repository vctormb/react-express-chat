import React, { Component } from 'react';
// import update from 'immutability-helper';

// redux
import { connect } from 'react-redux';

// context
import ChatProvider from './Context/ChatProvider';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, } from 'rebass';

// components
import PrivateRoute from '../../components/Routing/PrivateRoute';
import SidebarContainer from './SidebarContainer';
import ChatBoxContainer from './ChatBoxContainer';

const FlexWrapper = styled(Flex)`
    flex: 1;
`;

class Wrapper extends Component {
	state = {}

	render() {
		const { authReducer: { onlineUsers, user, } } = this.props;

		return (
			<ChatProvider>
				<FlexWrapper mx={0}>
					<SidebarContainer
						nickname={user.data.nickname}
						onlineUsers={onlineUsers}
					/>
					<PrivateRoute
						exact
						path="/chat/:id?"
						component={ChatBoxContainer}
					/>
				</FlexWrapper>
			</ChatProvider>
		);
	}
}

const mapStateToProps = state => ({
	authReducer: state.auth,
});

export default connect(mapStateToProps)(Wrapper);