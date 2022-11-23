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



interface IChartProps {
    coinId: string;
}


function Chart({coinId}: IChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistorical[]>(
            ["ohlcv", coinId], () => 
                fetchCoinHistory(coinId), 
                {refetchInterval: 5000,}
            )
    let validData = data ?? [];
	if ("error" in validData) {
		validData = [];
	};

    return (
        <>
        {isLoading ? (
            "Loading Chart..."
        ) : (
            <div>
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "시세",
                            data: validData?.map((price) => price.close) ?? [],
                        },
                    ]}
                    options={{
                    noData: {
                        text: "차트 데이터가 없습니다.",
                        align: "center",
                        verticalAlign: "middle",
                        offsetX: 0,
                        offsetY: 0,
                    },
                    theme: {
                        mode: isDark? "dark" : "light",
                    },
                    chart: {
                        height: "300px",
                        width: "100%",
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    xaxis: {
                        type: "datetime",
                        categories: validData?.map((price) => price.time_close),
                    },
                    yaxis: {
                        labels: {
                            formatter: (value: number) => `$${value.toFixed(0)}`
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
                            formatter: (value: number) => `$${value.toFixed(2)}`,
                        },
                    }
                }}
                />
                <ApexChart 
                    type="candlestick"
                    series={[
                        {
                            name: "시세",
                            data: validData.map((price) => ({
                                x: price.time_close,
                                y: [price.open, price.high, price.low, price.close],
                            })),
                        },
                    ]}
                    options ={{
                        noData: {
                            text: "",
                        },
                        theme: {
                            mode: isDark? "dark" : "light",
                        },
                        chart: {
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                            width: 500,
                            height: 300,
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: "red",
                                    downward: "blue",
                                },
                                wick: {
                                    useFillColor: true,
                                },
                            },
                        },   
                        xaxis: {
                            type: "datetime",
                            categories: validData?.map((price) => price.time_close),
                        },
                        yaxis: {
                            labels: {
                                formatter: (value) => `$${value.toFixed(0)}`
                            },
                            tickAmount: 6,
                        },
                        stroke: {
                            width: 2,
                        },                 
                    }}
                />
            </div>
        )}
        </>
    );
};

export default Chart;