import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, ITodo, todoState } from "../atoms";

const Todo = ({ text, category, id }: ITodo) => {
  const setTodos = useSetRecoilState(todoState);
  // interface 중 하나 지정
  // const onClick = (cat: ITodo["category"]) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event interface 지정해줄 때
    // console.log("new category", event.currentTarget.name);
    const {
      currentTarget: { name },
    } = event;
    setTodos((old) => {
      const targetIndex = old.findIndex((todo) => todo.id === id);
      // const oldTodo = old[targetIndex];
      const newTodo = { text, id, category: name as any }; // interface error 없애기 위해
      // console.log(oldTodo, newTodo, "old & new");

      // 클릭시 local storage 도 수정되도록 기능 구현
      localStorage.removeItem(newTodo.id.toString());
      localStorage.setItem(newTodo.id.toString(), JSON.stringify(newTodo));
      // setValues(JSON.stringify(newTodo));

      return [
        ...old.slice(0, targetIndex),
        newTodo,
        ...old.slice(targetIndex + 1),
      ];
    });
  };
  const onClickDelete = () => {
    setTodos((old) => {
      const targetIndex = old.findIndex((t) => t.id === id);
      const todo = { text, id, category };

      // 클릭시 삭제되는 기능 구현
      // setValues("");
      localStorage.removeItem(todo.id.toString());
      return [...old.slice(0, targetIndex), ...old.slice(targetIndex + 1)];
    });
  };

  return (
    <li>
      <span onClick={onClickDelete}>{text}</span>
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
