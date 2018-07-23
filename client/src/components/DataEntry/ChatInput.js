import React from 'react';

// styled components
import styled from 'styled-components';

// rebass
import { Input } from 'rebass';

const CustomInput = styled(Input)`
	padding: 0.625em 2.375em 0.625em 0.625em;
`;

const InputWrapper = styled.div`
	background-color: hsla(218,5%,47%,.3);
	border-radius: 5px;
`;

const ChatInput = props => (
	<InputWrapper>
		<CustomInput
			{...props}
			placeholder="Message"
			boxShadow='none'
		/>
	</InputWrapper>
)

export default ChatInput;