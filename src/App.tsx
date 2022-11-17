import React, { useState } from "react";
import styled from "styled-components";
// import Circle from "./Circle";

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
`;

const Title = styled.h1`
    color: ${(props) => props.theme.textColor}
`;


function App() {
    const [value, setValue] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        const { currentTarget: {value} } = event; // const value = event.currentTarget.value;
        setValue(value);
    };
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("hello", value);
    };

    return (
        <Wrapper>
            <Title>Typescript react</Title>
            {/* <Circle bgColor="teal" borderColor="black" />
            <Circle bgColor="tomato" text="im here" /> */}
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="username" 
                    value={value} 
                    onChange={onChange}
                />
                <button>Log in</button>
            </form>
        </Wrapper>
    );
}

export default App;
