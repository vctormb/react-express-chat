import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Backdrop = styled.div`
		position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000a3;
`;

const SidebarBackdrop = ({ show, ...rest, }) => {
	return show ? <Backdrop {...rest} /> : null;
}

SidebarBackdrop.defaultProps = {
	show: false,
}

SidebarBackdrop.propTypes = {
	show: PropTypes.bool,
}

export default SidebarBackdrop;