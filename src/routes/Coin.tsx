// coin id로 코인 받기 (Coins)
// https://api.coinpaprika.com/#operation/getCoinById

// coin id로 특정 코인에 대한 시세 정보 얻기 (Tickers)
// https://api.coinpaprika.com/#operation/getTickersById


// import { useEffect, useState } from "react";
import { 
    useLocation, 
    useParams, 
    Switch, 
    Route, 
    Link, 
    useRouteMatch 
} from "react-router-dom";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinTickers } from "./api";


const Title = styled.h1`
	font-size: 2.4rem;
	font-weight: 600;
	max-width: 11ch;
	text-overflow: ellipsis;
	overflow-x: clip;
	white-space: nowrap;
`;



const Container = styled.div`
	padding: 0 2rem;
	max-width: 30rem;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	color: ${(props) => props.theme.accentColor};
`;


const Loader = styled.span`
    text-align: center;
    display: block;
`;


const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 8rem;
	p {
		line-height: 1.5;
	}
`;


const Overview = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: ${(props) => props.theme.cardBgColor};
	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	padding: 1rem;
`;


const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	span:first-child {
		font-size: 0.75rem;
		font-weight: 700;
		opacity: 0.6;
	}
`;


const Tab = styled(Link)<{ $isActive: boolean }>`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 3rem;
	font-weight: ${(props) => (props.$isActive ? "700" : "500")};
	color: ${(props) => (props.$isActive ? props.theme.accentColor : props.theme.textColor)};
	opacity: ${(props) => (props.$isActive ? 1 : 0.6)};
	transition: color 0.3s;
	&::after {
		content: "";
		position: absolute;
		height: 2px;
		bottom: 4px;
		width: 1.4rem;
		border-radius: 1px;
		background-color: ${(props) => (props.$isActive ? props.theme.accentColor : props.theme.textColor)};
		transition: background-color 0.3s;
	}
`;

const Tabbar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;


const BackBtn = styled(Link)`
	position: absolute;
	left: 0;
	font-size: 2.2rem;
	display: flex;
	align-items: center;
	padding: 0.8rem;
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

interface IPriceData {
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
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    
    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(
        ["info", coinId], () => fetchCoinInfo(coinId)
        );
    const {isLoading: tickersLoading, data: tickersData} = useQuery<IPriceData>(
        ["tickers", coinId], () => fetchCoinTickers(coinId),
        {
            refetchInterval: 5000,
        }
        );

    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    // useEffect(() => {
    //     (async() => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);

    const loading = infoLoading || tickersLoading;

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>
                        {state?.name ? (state.name) : (loading ? "Loading" : infoData?.name)}
                    </title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <BackBtn to="/">
                    &larr;
                    {/* <Link to="/">&larr;</Link> */}
                </BackBtn>
                <Title>
                    {state?.name ? (state.name) : (loading ? "Loading" : infoData?.name)}
                </Title>
            </Header>
            {loading ? (
                <Loader>{coinId} 로딩 중...</Loader>
            ) : (
                <>
                    {/* overview 화면 */}
                    <DetailContainer>
                        <Overview>
                            <OverviewItem>
                                <span>순위</span>
                                <span>{infoData?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>심볼</span>
                                <span>${infoData?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>현재가</span>
                                <span>${tickersData?.quotes.USD.price.toFixed(3) ?? "Unknown"}</span>
                            </OverviewItem>
                        </Overview>
                        <Overview>
                            <OverviewItem>
                                <span>총량</span>
                                <span>{tickersData?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>최대 발행량</span>
                                <span>{tickersData?.max_supply}</span>
                            </OverviewItem>
                        </Overview>
                        {infoData?.description ? (
                            <Overview>
                                <p>{infoData?.description}</p>
                            </Overview>
                        ) : null}
                        <Tabbar>
                            <Tab to={`/${coinId}/price`} $isActive={priceMatch !== null}>
                                Price
                            </Tab>
                            <Tab to={`/${coinId}/chart`} $isActive={chartMatch !== null}>
                                Chart
                            </Tab>
					    </Tabbar>

                        {/* route 화면 */}
                        <Switch>
                            <Route path={"/:coinId/price"}>
                                <Price coinId={coinId} />
                            </Route>
                            <Route path={"/:coinId/chart"}>
                                <Chart coinId={coinId} />
                            </Route>
                        </Switch>

                    </DetailContainer>
                </>
            )}
        </Container>
    );
};

export default Coin;