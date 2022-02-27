import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Route, Routes, useLocation, useMatch, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { coinInfoFetcher, coinTickersFetcher } from "../api";
import Chart from "./Chart";
import Price from "./Price";

// styled components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
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
  align-item: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 5px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
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

// interfacr
interface RouteState {
  state: {
    name: string;
  };
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

// Components
const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation() as RouteState; // @6부터 <RouteState> 지원 안함
  // console.log(name);
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  const priceMatch = useMatch(`/${coinId}/price`); // current URL 과 일치하는지 확인하기 위함!
  const chartMatch = useMatch(`/${coinId}/chart`);
  // console.log(priceMatch);

  /* useQuery 사용 */
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    coinId ? ["info", coinId] : "",
    () => coinInfoFetcher(coinId ? coinId : "")
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    coinId ? ["tickers", coinId] : "",
    () => coinTickersFetcher(coinId ? coinId : "")
  );

  const loading = infoLoading || tickersLoading;

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json(); // capsulate
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     // console.log(infoData);
  //     // console.log(priceData);
  //     setLoading(false);
  //   })(); // 함수가 바로 실행됨
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>{" "}
        {/* info?. 문법으로 undefined 이거나 없는 경우 보호 */}
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank : </span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol : </span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price : </span>
              <span>
                {tickersData?.quotes.USD.price
                  ? tickersData?.quotes.USD.price.toFixed(3)
                  : "No"}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply : </span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply : </span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Go to Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Go to Chart</Link>
            </Tab>
          </Tabs>

          <Routes>
            {/* v6 alert!부모 path 에서 /*로 표현해주었기때문에 /price가 아니라 그냥 price! */}
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;
