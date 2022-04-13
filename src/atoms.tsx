import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE";
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  // 특정 옵션으로 제한할 경우
  category: Categories;
  id: number;
}

// atom 은 단순히 '배열' 이라는 것을 준다면
// selector 는 state 를 가져다가 다른 뭔가를 return 하는 동작
export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// set 함수와 다른 점은 set 함수는 원래 state 를 변형한다면 selector 는 기존 state를 이용만 할 뿐 변형하지는 않음
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState); // 모든 투두를 받음 (get은 함수), 계속 주시하고 있음
    const category = get(categoryState);

    // return [
    //   todos.filter((todo) => todo.category === "TO_DO"),
    //   todos.filter((todo) => todo.category === "DOING"),
    //   todos.filter((todo) => todo.category === "DONE"),
    // ]; // [[], [], []] 이렇게 저장됨
    return todos.filter((todo) => todo.category === category); // 간단하게 작성
  },
});
