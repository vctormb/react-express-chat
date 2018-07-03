import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, Input, } from 'rebass';

// intern components
const BoxWrapper = styled(Flex)`
    display: flex;
    flex-direction: column;
		flex-shrink: 0;
		background-color: ${props => props.theme.colors.graydark};
		width: 15em;
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

const InputWrapper = styled.div`
	background-color: rgba(0,0,0,.2);
	border-radius: 4px;
	border: 1px solid rgba(0,0,0,.1);
	padding: 0.125em;
	flex: 1;
`;

const CustomInput = styled(Input)`
	font-weight: 500;
`;

const Footer = styled.div`
    padding: 0.9375em 0.625rem;
    color: white;
    background-color: rgba(32,34,37,.3);
		font-size: 0.875rem;
`;

const SideListButton = styled(Link)`
		text-decoration: none;
		margin: 0.0625em .5em;
		padding: .5em;
		border-radius: 3px;
		opacity: .3;
		color: #fff;

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
					{this.state.friends.map((val, index) => (
						<SideListButton
							key={index}
							to="/"
						>
							{val}
						</SideListButton>
					))}
				</Body>
				<Footer>
					<span>Nickname</span>
				</Footer>
			</BoxWrapper>
		);
	}
}

export default SideList;