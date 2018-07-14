import React, { Component } from 'react';

// styled components
import styled from 'styled-components';

// rebass
import {
	Flex,
	Input,
	Box,
	Label,
	Button,
} from 'rebass';

// intern components
const FlexWrapper = styled(Flex)`
	flex: 1;
`;

const FormBox = styled(Box)`
	background-color: ${props => props.theme.colors.graydark};
	box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
	text-align: center;
	width: 30em;

	@media (max-width: 490px) {
		display: flex;
		justify-content: center;
		flex-direction: column;

		background: linear-gradient(to left bottom,#3d4046,#1e1e23);
		width: 100%;
		height: 100%;
		padding: 1.25em;
	}
`;

const CustomInput = styled(Input)`
	height: 2.5em;
	border: 1px solid ${props => props.theme.colors.grayxdark};
	color: ${props => props.theme.colors.graywhite};
`;

const InputLabel = styled(Label)`
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: .5px;
	color: ${props => props.theme.colors.graywhite};
`;

const LoginButton = styled(Button)`
	background-color: ${props => props.theme.colors.purple};
	width: 100%;
	min-height: 2.75em;
	cursor: pointer;

	&:hover {
		background-color: ${props => props.theme.colors.purplesoft};
	}

	&:focus {
		background-color: ${props => props.theme.colors.purpledark};
		box-shadow: none;
	}
`;

class Login extends Component {
	state = {}

	render() {
		return (
			<FlexWrapper
				justifyContent="center"
				alignItems="center"
			>
				<FormBox
					p={40}
				>
					<InputLabel fontSize="0.75rem">
						Nickname
						</InputLabel>

					<CustomInput
						bg="rgba(0,0,0,.1)"
						px={10}
						mb={8}
						borderRadius={3}
					/>


					<LoginButton
						fontWeight={500}
						fontSize="1rem"
						borderRadius={3}
					>
						Let's chat!
					</LoginButton>
				</FormBox>
			</FlexWrapper>
		);
	}
}

export default Login;