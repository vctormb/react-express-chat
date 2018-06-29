import React, { Component } from 'react';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, Box, Text, } from 'rebass';

// intern components
const BoxWrapper = styled(Flex)`
    display: flex;
    flex-direction: column;
`;

const Header = styled('div')`
    padding: 0.625rem 1rem;
    color: white;
    background-color: ${props => props.theme.colors.graydark};
    border-bottom: 2px solid ${props => props.theme.colors.graylight};
`;

const Body = styled('div')`
    flex: 1;
    padding: 0.625rem 1rem;
    overflow-y: scroll;
    color: white;
    background-color: ${props => props.theme.colors.graylight};

    ::-webkit-scrollbar {
        width: 6px;
    }
 
    ::-webkit-scrollbar-thumb {
        background-color: black;
    }
`;

const Footer = styled('div')`
    padding: 0.625rem 1rem;
    color: white;
    background-color: ${props => props.theme.colors.graylight};
`;

class ChatBox extends Component {
	state = {}

	render() {
		return (
			<BoxWrapper width={[10 / 12]}>
				<Header>Header</Header>
				<Body>
					Chat!
				</Body>

				<Footer>Footer</Footer>
			</BoxWrapper>
		);
	}
}

export default ChatBox;