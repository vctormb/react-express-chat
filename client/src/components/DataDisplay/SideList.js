import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, } from 'rebass';

// intern components
const BoxWrapper = styled(Flex)`
    display: flex;
    flex-direction: column;
		background-color: ${props => props.theme.colors.graydark};
`;

const Header = styled.div`
    padding: 0.625rem 1rem;
    color: white;
		box-shadow: ${props => props.theme.shadows.bottom};
`;

const Body = styled(Flex)`
    flex: 1;
    padding-top: 1.25em;
    overflow-y: scroll;
    color: white;

    ::-webkit-scrollbar {
        width: 6px;
    }
 
    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.grayxdark};
    }
`;

const Footer = styled.div`
    padding: 0.625rem 1rem;
    color: white;
    background-color: rgba(32,34,37,.3);
`;

const SideListButton = styled(Link)`
		text-decoration: none;
		margin: 0.0625em .5em;
		padding: .5em;
		border-radius: 3px;
		opacity: .3;
		color: #fff;
		font-weight: 500;

		&:hover {
			background-color: ${props => props.theme.colors.graysoft};
			opacity: 1;
		}
`

class SideList extends Component {
	state = {
		friends: []
	}

	componentDidMount() {
		this.generateMenu();
	}

	generateMenu() {
		const arr = [];

		for (let i = 0; i < 20; i++) {
			arr.push(`friend ${i + 1}`)
		}

		this.setState({
			friends: arr
		});
	}

	render() {
		return (
			<BoxWrapper width={[2 / 12]}>
				<Header>Search bar</Header>
				<Body
					flexDirection="column"
				>
					{this.state.friends.map((val, index) => (
						<SideListButton
							key={index}
							to="/"
						>
							{val}
						</SideListButton>
					))}
				</Body>
				<Footer>Nickname</Footer>
			</BoxWrapper>
		);
	}
}

export default SideList;