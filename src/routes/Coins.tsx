import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";


const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
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
`;


const CoinList = styled.ul`
	display: flex;
	gap: 1rem;
	flex-direction: column;
`;


const Coin = styled.li`
	display: flex;
	align-items: center;
	min-height: 3.5rem;
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    border-radius: 15px;
    box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	transition: background-color 0.3s, box-shadow 0.3s;
    a {
		display: flex;
		padding: 1rem;
		width: 100%;
		align-items: center;
		transition: color 0.3s;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
            box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
        }
    }
`;


const Loader = styled.span`
	text-align: center;
	display: block;
`;


const Logo = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 0.7rem;
`;


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

    // React Query 사용
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>코인</title>
                </Helmet>
            </HelmetProvider>
            <Header>
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
                                <Logo src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
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