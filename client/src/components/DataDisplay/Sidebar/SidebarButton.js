import React from 'react';
import PropTypes from 'prop-types';

// styled components
import styled from 'styled-components';

// react-router
import { Link } from 'react-router-dom';

const Button = styled(Link)`
		display: flex;	
		align-items: center;
		flex-shrink: 0;
		text-decoration: none;
		margin: 0.0625rem .5rem;
		padding: .3rem .5rem;
		border-radius: 3px;
		color: #fff;
		background-color: ${p => p.variant.isSelected ? p.theme.colors.graylight : 'transparent'};		

		&:hover {
			background-color: ${props => props.theme.colors.graysoft};
			opacity: 1;
		}

		& > span {
			flex: 1;
			overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
			opacity: .3;
		}
`;

const SidebarButton = ({ isSelected, children, ...rest }) => (
	<Button
		{...rest}
		variant={{
			isSelected: isSelected,
		}}
	>
		{children}
	</Button>
)

SidebarButton.defaultProps = {
	isSelected: false,
}

SidebarButton.propTypes = {
	isSelected: PropTypes.bool,
}

export default SidebarButton;