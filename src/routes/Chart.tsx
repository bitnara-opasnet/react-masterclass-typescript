import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts"
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";


interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}



interface ChartProps {
    coinId: string;
}


function Chart({coinId}: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);

    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId], () => fetchCoinHistory(coinId),
        {
            refetchInterval: 5000,
        }
        )
    return (
        <>
        <h1>Chart</h1>
        {isLoading ? (
            "Loading Chart..."
        ) : (
            <ApexChart
                series={[
                    {
                        name: "종가",
                        data: data?.map((price) => price.close) ?? [],
                    },
                ]}
                options={{
                    theme: {
                        mode: isDark? "dark" : "light",
                    },
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    xaxis: {
                        type: "datetime",
                        categories: data?.map((price) => price.time_close),
                    },
                    yaxis: {
                        labels: {
                            formatter: (value) => `$${value.toFixed(0)}`
                        },
                        tickAmount: 6,
                    },
                    stroke: {
                        curve: "smooth",
                        width: 4,
                    },
                    fill: {
                        type: "gradient",
                        gradient: {gradientToColors: ["#0be881"], stops: [0, 100]}
                    },
                    colors: ["#0fbcf9"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$${value.toFixed(2)}`,
                        },
                    }
                }}
                type="line"
            />
        )}
        </>
    );
};

export default Chart;