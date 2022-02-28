import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { coinHistoryFetcher, coinTickersFetcher } from "../api";

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

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
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = () => {
  const [athPriceClick, setAthPriceClick] = useState(false);
  const athClick = () => {
    setAthPriceClick(!athPriceClick);
  };
  const [marketCapClick, setMarketCapClick] = useState(false);
  const marketClick = () => {
    setMarketCapClick(!marketCapClick);
  };
  const [volumeClick, setVolumeClick] = useState(false);
  const volClick = () => {
    setVolumeClick(!volumeClick);
  };

  const { coinId } = useParams<{ coinId: string }>();
  const { isLoading, data } = useQuery<PriceData>(
    ["ticker price", coinId],
    () => coinTickersFetcher(coinId ? coinId : "")
  );
  // console.log(data?.quotes.USD.ath_price);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Tabs>
          <Tab isActive={athPriceClick} onClick={athClick}>
            All Time High Price :
            {athPriceClick ? (
              <h2 style={{ color: "white" }}>
                {data?.quotes.USD.ath_price.toFixed(3)}
              </h2>
            ) : (
              <h2>Click to Show</h2>
            )}
          </Tab>
          <Tab isActive={marketCapClick} onClick={marketClick}>
            Market Cap :
            {marketCapClick ? (
              <h2 style={{ color: "white" }}>{data?.quotes.USD.market_cap}</h2>
            ) : (
              <h2>Click to Show</h2>
            )}
          </Tab>
          <Tab isActive={volumeClick} onClick={volClick}>
            Volume For 24 Hours :
            {volumeClick ? (
              <h2 style={{ color: "white" }}>{data?.quotes.USD.volume_24h}</h2>
            ) : (
              <h2>Click to Show</h2>
            )}
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default Price;
