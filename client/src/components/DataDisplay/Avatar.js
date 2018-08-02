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
	background-image: url("https://cdn.icon-icons.com/icons2/1371/PNG/512/robot01_90832.png");
	background-size: cover;
	border-radius: 50%;	
`;

class Avatar extends Component {
	state = {}

	render() {
		const {
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