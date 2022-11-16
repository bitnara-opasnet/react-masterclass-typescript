import styled from "styled-components";

// 객체의 속성 선언 => Container
interface ContainerProps {
    bgColor: string;
    borderColor: string; 
}

//styled-components에서 인터페이스 사용
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
    border: 1px solid ${(props) => props.borderColor};
`

// circle 속성 선언
interface CircleProps {
  bgColor: string;
  borderColor?: string; //옵션 속성
  text?: string;
};


// nullish 병합 연산자 사용 => ?? 앞의 값이 undefined면 오른쪽의 값 선택
function Circle({bgColor, borderColor, text="default text"}: CircleProps) {
      return (
      <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
      </Container>
    );
    // 삼항 연산자일 경우 ==> borderColor ? borderColor : bgColor

};

export default Circle;