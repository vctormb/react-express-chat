import React, { Component } from 'react';
import { Route, } from "react-router-dom";

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
		return (
			<FlexWrapper mx={0}>
				<SideList />
				<Route path="/chat/:id?" component={ChatBox} />
			</FlexWrapper>
		);
	}
}

export default Wrapper;