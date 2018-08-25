// styled components
import styled from 'styled-components';

const ChatboxContent = styled.div`
  flex: 1;
  overflow-y: auto;
  color: white;

  ::-webkit-scrollbar {
      width: 6px;
  }
 
  ::-webkit-scrollbar-thumb {
		background-color: ${props => props.theme.colors.grayxdark};
  }
`;

export default ChatboxContent;