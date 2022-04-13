import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, todoSelector } from "../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const ToDoList = () => {
  // const todos = useRecoilValue(todoState); // 리팩토링하며 modifier 함수 필요없어졌기 때문에 useRecoilValue 사용
  const todos = useRecoilValue(todoSelector); // 배열 풀어주기
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  console.log(todos);

  return (
    <div>
      <h1>TO DOs</h1>
      <select onInput={onInput} value={category}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateTodo />
      {todos.map((todo) => {
        return <Todo key={todo.id} {...todo} />;
      })}
    </div>
  );
};

export default ToDoList;
