import React from 'react';
import styled from 'styled-components';

// rebass
import { Flex, } from 'rebass';

const mixinMobileSidebar = props => `
	transform: ${props.variant.showSideList ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)'};
	position: fixed;
	height: 100%;
	box-shadow: ${props.variant.showSideList ? props.theme.shadows.right : 'none'};
	overflow: hidden;	
	transition: all ${props.variant.showSideList ? '270ms ease-in' : '130ms ease-out'};
`;

const BoxWrapper = styled(Flex)`
    display: flex;
    flex-direction: column;
		flex-shrink: 0;
		background-color: ${props => props.theme.colors.graydark};
		width: 15rem;

		/* 48em */
		@media (max-width: 26.24em) {
			/* when sidelist is open on mobile devices */
			${mixinMobileSidebar}
			width: ${props => props.variant.showSideList ? '80%' : '15rem'};
		}

		@media (min-width: 26.25em) and (max-width: 48em) {
			${mixinMobileSidebar}
			width: 15rem;
		}
`;

class Sidebar extends React.Component {
	state = {}

	render() {

		return (
			<BoxWrapper {...this.props}>
				{this.props.children}
			</BoxWrapper>
		);
	}
}

export default Sidebar;