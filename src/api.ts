// fetch 함수 따로 만들어주기
// api 관련 작업은 component 와 분리되어있는 것이 좋다
const BASE_URL = `https://api.coinpaprika.com/v1`;
export const coinsFetcher = () => {
  // async - await 대신 then promie 문법 사용
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

export const coinInfoFetcher = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const coinTickersFetcher = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};

export const coinHistoryFetcher = (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((res) => res.json());
};
