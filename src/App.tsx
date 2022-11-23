import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./routes/Router";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
// import { ReactQueryDevtools } from "react-query/devtools";



const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
        display: block;
    }
    /* HTML5 hidden-attribute fix for newer browsers */
    *[hidden] {
        display: none;
    }
    body {
        line-height: 1;
    }
    menu, ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'Open Sans', sans-serif;
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.textColor}
    }
    a {
        text-decoration:none;
        color: inherit;
    }
`;


const Toggle = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 1rem;
	left: 1rem;
	width: 3rem;
	height: 3rem;
	padding: 0;
	font-size: 1.6rem;
	border: none;
	border-radius: 50%;
	background-color: ${(props) => props.theme.cardBgColor};
	color: ${(props) => props.theme.accentColor};
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	transition: background-color 0.3s, box-shadow 0.3s;
	cursor: pointer;
`


function App() {
    const isDark = useRecoilValue(isDarkAtom);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    return (
        <>
            <ThemeProvider theme={isDark? darkTheme : lightTheme}>
                <Toggle onClick={toggleDarkAtom}>
                    <div>
                        {isDark ? "🔆" : "🌙"}
                    </div>
				</Toggle>
                <GlobalStyle />
                <Router />
                {/* <ReactQueryDevtools initialIsOpen={true} /> */}
            </ThemeProvider>
        </>
    );
}

export default App;

