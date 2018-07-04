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
`;

const CustomInput = styled(Input)`
	height: 40px;
	border: 1px solid ${props => props.theme.colors.grayxdark};
`;

const InputLabel = styled(Label)`
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: .5px;
	color: ${props => props.theme.colors.graywhite};
`;

const LoginButton = styled(Button)`
	background-color: ${props => props.theme.colors.purple};
	flex: 1;
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
					width={480}
					color='white'
					bg='blue'
				>
					<Box mb={20}>
						<InputLabel
							fontSize="0.75rem"
							mb={8}
						>
							Nickname
						</InputLabel>
						<CustomInput
							bg="rgba(0,0,0,.1)"
							px={10}
							borderRadius={3}
						/>
					</Box>
					<Flex>
						<LoginButton
							fontWeight={500}
							fontSize="1rem"
							borderRadius={3}
						>
							Let's chat!
					</LoginButton>
					</Flex>
				</FormBox>
			</FlexWrapper>
		);
	}
}

export default Login;