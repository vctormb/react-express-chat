// styled components
import styled from 'styled-components';

const ChatboxFooter = styled.div`
	margin: 0 1.25em;
  padding: 1.625rem 0;
  color: white;
  background-color: ${props => props.theme.colors.graylight};
	box-shadow: 0 -1px 0 hsla(0,0%,100%,.06);
`;

export default ChatboxFooter;