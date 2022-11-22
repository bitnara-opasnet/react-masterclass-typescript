// import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { isDarkAtom } from '../atoms';
import { fetchCoins } from "./api";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;


const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const CoinList = styled.ul``;


const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid white;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;


const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;


const Loader = styled.span`
  text-align: center;
  display: block;
`;


const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;


const Btn = styled.button`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.cardBgColor};
    border: 0;
    color: ${(props) => props.theme.textColor};
`


interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}



function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    // const [coins, setCoins] = useState<ICoin[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async() => {
    //         const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

    // const setDarkAtom = useSetRecoilState(isDarkAtom);
    const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
    const toggleDarkAtom = () => 
        setDarkAtom((prev) => !prev)
    ;

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>코인</title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <Btn onClick={toggleDarkAtom}>
                    {isDark ? "🌞" : "🌙"}
                </Btn>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
            <Loader>Loading...</Loader>
            ) : (
                <CoinList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={{
                                pathname: `/${coin.id}`,
                                state: { name: coin.name },
                            }}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinList>
            )}
        </Container>
    );
};

export default Coins;