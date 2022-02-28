import { useNavigate } from "react-router";
import styled from "styled-components";

const NavWrapper = styled.div`
  display: block;
  button {
    background-color: #e1b12c;
    border-radius: 7px;
    padding: 5px;
    margin-bottom: 10px;
    margin-right: 5px;
  }
`;

const Navigator = () => {
  const navigate = useNavigate();

  return (
    <NavWrapper>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => navigate("/")}>Go Home</button>
    </NavWrapper>
  );
};

export default Navigator;
