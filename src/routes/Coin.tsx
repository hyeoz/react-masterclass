import { useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  state: {
    name: string;
  };
}

const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [loading, setLoading] = useState(true);
  const {
    state: { name },
  } = useLocation() as RouteState; // @6부터 <RouteState> 지원 안함
  console.log(name);

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
