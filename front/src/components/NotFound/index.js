import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      NotFound
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default NotFound;
