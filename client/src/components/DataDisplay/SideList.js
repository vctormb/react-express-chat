import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, Input, } from 'rebass';

// components
import Avatar from './Avatar';

// intern components
const BoxWrapper = styled(Flex)`
    display: flex;
    flex-direction: column;
		flex-shrink: 0;
		background-color: ${props => props.theme.colors.graydark};
		width: 15rem;
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
    padding-top: 1.25rem;
    overflow-y: auto;
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
	padding: 0.125rem;
	flex: 1;
`;

const CustomInput = styled(Input)`
	font-weight: 500;
`;

const Footer = styled(Flex)`
    padding: 0.9375rem 0.625rem;
    color: white;
    background-color: rgba(32,34,37,.3);
		font-size: 0.875rem;
		
		& > span {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
`;

const SideListButton = styled(Link)`
		display: flex;	
		align-items: center;
		flex-shrink: 0;
		text-decoration: none;
		margin: 0.0625rem .5rem;
		padding: .3rem .5rem;
		border-radius: 3px;
		color: #fff;

		&:hover {
			background-color: ${props => props.theme.colors.graysoft};
			opacity: 1;
		}

		& > span {
			overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
			opacity: .3;
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

		for (let i = 1; i < 6; i++) {
			arr.push({
				id: i,
				name: `friend ${i}`,
			})
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
							to={`/chat/${val.id}`}
						>
							<React.Fragment>
								<Avatar
									width="30px"
									height="30px"
									m="0 .75rem 0 0"
								/>
								<span>{val.name}</span>
							</React.Fragment>
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