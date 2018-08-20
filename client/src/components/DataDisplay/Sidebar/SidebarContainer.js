import React from 'react';
import PropTypes from 'prop-types';

class SidebarContainer extends React.Component {
	state = {
		show: false,
	}

	componentDidMount() {
		this.showOrHide();
	}

	static getDerivedStateFromProps(props, state) {
		if (props.show !== state.show) {
			return {
				show: props.show,
			}
		}

		return null;
	}

	showOrHide() {
		const { show, } = this.props;

		this.setState({ show });
	}

	render() {
		return this.props.children(this.state);
	}
}

SidebarContainer.defaultProps = {
	show: false,
}

SidebarContainer.propTypes = {
	show: PropTypes.bool,
}

export default SidebarContainer;