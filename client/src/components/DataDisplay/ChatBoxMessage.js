import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components';

// rebass
import { Flex, } from 'rebass';

const MessageWrapper = styled.div`
	margin: 0 1.25em;
	padding: 1.25em 0;
	&:not(:last-child) {
		border-bottom: 1px solid hsla(0,0%,100%,.04);
	}
`;

const FlexWrapper = styled(Flex)`
	& > span {
		font-weight: 500;
	}
`

const Message = styled.div`
	font-size: 0.9375rem;
	color: hsla(0,0%,100%,.7);
`

class ChatBoxMessage extends Component {
	state = {}

	render() {
		const props = this.props;

		return (
			<MessageWrapper>
				<FlexWrapper flexDirection="column">
					<span>Nickname</span>
					<Message>{props.message}</Message>
				</FlexWrapper>
			</MessageWrapper>
		);
	}
}

ChatBoxMessage.propTypes = {
	message: PropTypes.string.isRequired,
}

export default ChatBoxMessage;