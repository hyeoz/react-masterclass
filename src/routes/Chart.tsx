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
        // <ApexChart
        //   type="line"
        //   options={{
        //     theme: { mode: "dark" },
        // chart: {
        //   height: 300,
        //   width: 500,
        //   toolbar: { show: false },
        //   background: "transparent",
        // },
        //     stroke: { curve: "smooth", width: 4 },
        //     grid: { show: false },
        //     yaxis: { show: false },
        //     xaxis: {
        //       labels: { show: false },
        //       axisTicks: { show: false },
        //       categories: data?.map((time) => time.time_close),
        //       type: "datetime",
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["blue"], stops: [0, 100] },
        //     },
        // colors: ["red"],
        // tooltip: { y: { formatter: (value) => `$ ${value.toFixed(3)}` } },
        //   }}
        //   series={[
        //     {
        //       name: "price",
        //       data: data?.map((price) => price.close),
        //     },
        //   ]}
        // />
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
          options={{
            chart: {
              height: 200,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            plotOptions: {
              bar: {
                columnWidth: "120%",
              },
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              type: "datetime",
              labels: { show: false },
              axisTicks: { show: false },
            },
            tooltip: {
              theme: "dark",
              custom: ({ dataPointIndex, w }) => {
                // console.log(w.globals);
                return (
                  '<div class="apexcharts-tooltip-candlestick">' +
                  '<div>Open: $<span class="value">' +
                  w.globals.seriesCandleO[0][dataPointIndex].toFixed(3) +
                  "</span></div>" +
                  '<div>High: $<span class="value">' +
                  w.globals.seriesCandleH[0][dataPointIndex].toFixed(3) +
                  "</span></div>" +
                  '<div>Low: $<span class="value">' +
                  w.globals.seriesCandleL[0][dataPointIndex].toFixed(3) +
                  "</span></div>" +
                  '<div>Close: $<span class="value">' +
                  w.globals.seriesCandleC[0][dataPointIndex].toFixed(3) +
                  "</span></div>" +
                  "</div>"
                );
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
