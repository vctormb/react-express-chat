import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, } from 'rebass';

// components
import Avatar from '../Avatar';

// intern components
const MessageWrapper = styled(Flex)`
	margin: 0 1.25rem;
	padding: 1.25rem 0;
	&:not(:last-child) {
		border-bottom: 1px solid hsla(0,0%,100%,.04);
	}
`;

const FlexWrapper = styled(Flex)`
	& > span {
		font-weight: 500;
	}
`;

const Message = styled.div`
	font-size: 0.9375rem;
	color: hsla(0,0%,100%,.7);
`;

const ChatBoxMessage = ({ nickname, message }) => (
	<MessageWrapper>
		<Avatar
			width="40px"
			height="40px"
			m="0 1.25rem 0 0"
		/>
		<FlexWrapper flexDirection="column">
			<span>{nickname}</span>
			<Message>{message}</Message>
		</FlexWrapper>
	</MessageWrapper>
);

ChatBoxMessage.propTypes = {
	nickname: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
}

export default ChatBoxMessage;