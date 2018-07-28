import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// context
import { ChatContext, } from '../../containers/Chat/Context/ChatContext';

// styled components
import styled from 'styled-components';

const Wrapper = styled.div`
		background-color: #f04747;
		padding: 0.1875rem 0.375rem;
		font-size: 0.75rem;
		border-radius: 3px;
		line-height: 12px;
		font-weight: 500;
`;

const INITIAL_STATE = {
	showCounter: true,
}

class MessageCounter extends Component {
	state = INITIAL_STATE;

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.hideCounter(this.props.match);
		}
	}

	hideCounter({ params }) {
		const { userId, } = this.props;

		if (userId === params.id) {
			this.setState({ showCounter: false });
		}
	}

	render() {
		if (this.state.showCounter) {
			return (
				<Wrapper>
					1
				</Wrapper>
			);
		}

		return null;
	}
}

MessageCounter.propTypes = {
	userId: PropTypes.string.isRequired,
}

const withContextConsumer = props => (
	<ChatContext.Consumer>
		{context =>
			<MessageCounter {...props} chatContext={context} />
		}
	</ChatContext.Consumer>
);

export default withRouter(withContextConsumer);