import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  .p-box {
    display: flex;
  }

  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 1rem 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({todos}) => {
  return (
    <StyledFooter>
      <div className='p-box'>
        <p>剩餘項目數： {todos.length}</p>
        <p>未完成項目數： {todos.filter((todo) => !todo.isDone).length}</p>
      </div>
      <StyledButton>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
