import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});
export const hourSelector = selector<number>({
  // selector 는 default 값으로 type 을 넘길 수 없기 때문에 직접 지정해줌
  key: "hours",
  // get function 을 통해 selector 안에서 atom 에 접근할 수 있게 됨
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  // 어떤 state 던지 원하는 state 를 수정할 수 있게 해줌
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
