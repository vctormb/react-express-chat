// styled components
import styled from 'styled-components';

const ChatboxHeader = styled.div`
		display: flex;
		align-items: center;
		height: 3rem;
		font-size: 1.125rem;
    padding: 0.8300rem 0.625rem;
    color: white;
    box-shadow: ${props => props.theme.shadows.bottom};
		font-weight: ${props => props.theme.fontWeights.bold};
`;

export default ChatboxHeader;