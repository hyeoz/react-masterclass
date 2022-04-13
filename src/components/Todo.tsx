import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, ITodo, todoState } from "../atoms";

const Todo = ({ text, category, id }: ITodo) => {
  const setTodos = useSetRecoilState(todoState);
  // interface 중 하나 지정
  // const onClick = (cat: ITodo["category"]) => {
  // event interface 지정해줄 때
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("new category", event.currentTarget.name);
    const {
      currentTarget: { name },
    } = event;
    setTodos((old) => {
      const targetIndex = old.findIndex((todo) => todo.id === id);
      // const oldTodo = old[targetIndex];
      const newTodo = { text, id, category: name as any }; // interface error 없애기 위해
      // console.log(oldTodo, newTodo, "old & new");

      return [
        ...old.slice(0, targetIndex),
        newTodo,
        ...old.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
};

export default Todo;
