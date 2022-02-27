import { useQuery } from "react-query";
import { useParams } from "react-router";
import { coinHistoryFetcher } from "../api";
import ApexChart from "react-apexcharts";

interface HistoricalDataInterface {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const { coinId } = useParams<{ coinId: string }>();
  // console.log(coinId);
  const { isLoading, data } = useQuery<HistoricalDataInterface[]>(
    ["ohlcv", coinId],
    () => coinHistoryFetcher(coinId ? coinId : "")
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        /* 자세한 옵션은 공식 문서 참고 
        https://apexcharts.com/docs/options */
        <ApexChart
          type="line"
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            stroke: { curve: "smooth", width: 4 },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              categories: data?.map((time) => time.time_close),
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(3)}` } },
          }}
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close),
            },
          ]}
        />
      )}
    </div>
  );
};

export default Chart;
