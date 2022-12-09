import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";


const GridContainer = styled.div`
	display: grid;
	gap: 15px;
`;


const GridItem = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	padding: 10px;
	background-color: ${(props) => props.theme.cardBgColor};
	border-radius: 10px;
    box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
`;

const Label = styled.div`
	font-size: 15px;
	font-weight: 700;
	opacity: 0.6;
`;


const BigGridItem = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	grid-column: 1 / 3;
	grid-row: 1 / 2;
	padding: 15px;
	justify-content: space-between;
	background-color: ${(props) => props.theme.cardBgColor};
	border-radius: 10px;
    box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	div:last-child {
		font-size: 30px;
		font-weight: 300;
	}
`;


const PriceIndicatorStyled = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 50%;
	justify-content: space-between;
	font-size: 32px;
	font-weight: 300;
`



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



interface IPriceProps {
    coinId: string;
}


function Price({coinId}: IPriceProps) {
    const {isLoading, data} = useQuery<IPriceData>(
            ["price", coinId], () => 
                fetchCoinTickers(coinId), 
                {refetchInterval: 5000,}
            );
    const ath = data?.quotes.USD?.ath_date;
    const athDate = new Date(ath??0);
    return (
        <>
        {isLoading? (
            "Loading Price..." 
        ) : (
            <GridContainer>
                <BigGridItem>
                    <Label>
                        {athDate.toLocaleDateString("ko-KR")} {athDate.toLocaleTimeString("ko-KR")}
                        <br/>
                        최고가 달성
                    </Label>
                    <div>$ {data?.quotes.USD.price.toFixed(3)}</div>
                </BigGridItem>
                <GridItem>
                    <Label>1시간 전보다</Label>
                    <PriceIndicatorStyled>{data?.quotes.USD.percent_change_1h.toFixed(1)}%</PriceIndicatorStyled>
                </GridItem>
                <GridItem>
                    <Label>6시간 전보다</Label>
                    <PriceIndicatorStyled>{data?.quotes.USD.percent_change_6h.toFixed(1)}%</PriceIndicatorStyled>
                </GridItem>
                <GridItem>
                    <Label>12시간 전보다</Label>
                    <PriceIndicatorStyled>{data?.quotes.USD.percent_change_12h.toFixed(1)}%</PriceIndicatorStyled>
                </GridItem>                <GridItem>
                    <Label>24시간 전보다</Label>
                    <PriceIndicatorStyled>{data?.quotes.USD.percent_change_24h.toFixed(1)}%</PriceIndicatorStyled>
                </GridItem>                <GridItem>
                    <Label>7일 전보다</Label>
                    <PriceIndicatorStyled>{data?.quotes.USD.percent_change_7d.toFixed(1)}%</PriceIndicatorStyled>
                </GridItem>                <GridItem>
                    <Label>30일 전보다</Label>
                    <PriceIndicatorStyled>{data?.quotes.USD.percent_change_30d.toFixed(1)}%</PriceIndicatorStyled>
                </GridItem>
            </GridContainer>
        )}
        </>
    );
};

export default Price;