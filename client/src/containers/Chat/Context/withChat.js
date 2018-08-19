import React from 'react';
import { ChatContext, } from './ChatContext';

const withChat = Component => {
	return class extends React.Component {
		render() {
			return (
				<ChatContext.Consumer>
					{context =>
						<Component {...this.props} chatContext={context} />
					}
				</ChatContext.Consumer>
			)
		}
	}
}

export default withChat;