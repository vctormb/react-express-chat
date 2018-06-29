import React, { Component } from 'react';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, Box, Text, } from 'rebass';
import { ENGINE_METHOD_DIGESTS } from 'constants';

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
    background-color: ${props => props.theme.colors.graydark};
    border-bottom: 2px solid ${props => props.theme.colors.graylight};

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
    background-color: ${props => props.theme.colors.graydark};
`;

class SideList extends Component {
	state = {
		friends: []
	}

	componentDidMount() {
		this.generateMenu()
	}

	generateMenu() {
		const arr = [];

		for (let i = 0; i < 20; i++) {
			arr.push(`friend ${i}`)
		}

		this.setState({
			friends: arr
		});
	}

	render() {
		return (
			<BoxWrapper width={[2 / 12]}>
				<Header>Header</Header>
				<Body>
					{this.state.friends.map((val, index) => (
						<p key={index} style={{ backgroundColor: "#2f3136" }}>{val}</p>
					))}
				</Body>
				<Footer>Footer</Footer>
			</BoxWrapper>
		);
	}
}

export default SideList;