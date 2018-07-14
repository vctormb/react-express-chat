import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components';

// rebass
import { Box, } from 'rebass';

// intern components
const Wrapper = styled(Box)`
	flex-shrink: 0;
	height: ${props => props.height};
	background-image: url("https://cdn.discordapp.com/avatars/431981005151141889/e7f89210b755b4a112f9649c8cdeddfa.png?size=256");
	background-size: cover;
	border-radius: 50%;	
`;

class Avatar extends Component {
	state = {}

	render() {
		const {
			props,
			props: { width, height, m, },
		} = this;

		return (
			<Wrapper
				width={width}
				height={height}
				m={m}
			>
			</Wrapper>
		);
	}
}

Avatar.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	m: PropTypes.string,
}

export default Avatar;