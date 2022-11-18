// coin id로 코인 받기 (Coins)
// https://api.coinpaprika.com/#operation/getCoinById

// coin id로 특정 코인에 대한 시세 정보 얻기 (Tickers)
// https://api.coinpaprika.com/#operation/getTickersById


import { useEffect, useState } from "react";
import { useLocation, useParams, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";



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



const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;


const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;


const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;


const Description = styled.p`
  margin: 20px 0px;
`;


interface RouteParams {
    coinId: string;
};


interface RouteState {
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            "ath_date": string,
            "price": number,
            "volume_24h": number,
            "volume_24h_change_24h": number,
            "market_cap": number
            "market_cap_change_24h": number,
            "percent_change_15m": number,
            "percent_change_30m": number,
            "percent_change_1h":number,
            "percent_change_6h":number,
            "percent_change_12h": number,
            "percent_change_24h": number,
            "percent_change_7d": number,
            "percent_change_30d": number,
            "percent_change_1y": number,
            "ath_price": number,
            "percent_from_price_ath": number,
        }
    };
}


function Coin() {
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();

    useEffect(() => {
        (async() => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId]);

    return (
        <Container>
            <Header>
                <Title>
                    {state?.name ? (
                        state.name
                        ) : (
                    loading ? "Loading" : info?.name
                    )}
                </Title>
            </Header>
            {loading ? (
            <Loader>Loading...</Loader>
            ) : (
                <>
                    {/* overview 화면 */}
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{info?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>${info?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{info?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{priceInfo?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceInfo?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    {/* route 화면 */}
                    <Switch>
                        <Route path={`/${coinId}/price`}>
                            <Price />
                        </Route>
                        <Route path={`/${coinId}/chart`}>
                            <Chart />
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    );
};

export default Coin;