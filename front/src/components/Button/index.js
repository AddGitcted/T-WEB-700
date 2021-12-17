import styled from "styled-components";

const Button = ({ colored, ...props }) => (
  <ButtonWrapper {...props}></ButtonWrapper>
);

const ButtonWrapper = styled.button`
  transition: 0.3s ease;
  border: none;
  outline: none;
  min-height: 36px;
  padding: 4px 20px;
  color: #fff;
  background: #2b5ddc;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    transform: scale(1.2);
    background-color: #2b5ddc3d;
    color: #434343;
  }
`;

export default Button;
