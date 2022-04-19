import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector); // selector 로 useRecoilState 를 받으면 배열 안에 get 함수, set 함수를 받아옴

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // 간단히 +붙여줌으로서 숫자로 바꿔줌
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Minutes"
        value={minutes}
        onChange={onMinutesChange}
      />
      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={onHoursChange}
      />
    </div>
  );
}

export default App;
