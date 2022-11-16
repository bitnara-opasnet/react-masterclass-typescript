import styled from "styled-components";
import Circle from "./Circle";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;


function App() {
  return (
    <Wrapper>
      <Title>Typescript react</Title>
      <Circle bgColor="teal" borderColor="black"/>
      <Circle bgColor="tomato" text="im here"/>
    </Wrapper>
  );
}

export default App;
