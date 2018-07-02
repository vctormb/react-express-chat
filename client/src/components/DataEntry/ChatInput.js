import React from 'react';

// styled components
import styled from 'styled-components';

// rebass
import { Input } from 'rebass';

const CustomInput = styled(Input)`
	padding: 10px 38px 10px 10px;
`

const InputWrapper = styled.div`
	background-color: hsla(218,5%,47%,.3);
	border-radius: 5px;
`

const ChatInput = props => (
	<InputWrapper>
		<CustomInput
			placeholder="Message"
			boxShadow='none'
		/>
	</InputWrapper>
)

export default ChatInput;