import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
`
const H1 = styled.h1`
  color: ${props => props.theme.textColor};
`

function App() {
  const [value, setValue] = useState("");
  // event 의 type 설정해주기
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value); // javascript 에서 target 으로 사용한 것과 같음
    const {currentTarget: {value}} = event;
    setValue(value)
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  return (
  <Container>
    <H1>protected</H1>
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="username" value={value} onChange={onChange} />
      <button>Log In</button>
    </form>
  </Container>
  );
}

export default App;
