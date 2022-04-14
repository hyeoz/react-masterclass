import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, ITodo, todoSelector } from "../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const ToDoList = () => {
  // const todos = useRecoilValue(todoState); // 리팩토링하며 modifier 함수 필요없어졌기 때문에 useRecoilValue 사용
  const recoilTodo = useRecoilValue(todoSelector); // 배열 풀어주기
  const [category, setCategory] = useRecoilState(categoryState);
  const [todos, setTodos] = useState<ITodo[]>();

  let localTodos: ITodo[] = [];

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  // console.log(todos, "todos read");

  useEffect(() => {
    // const getTodos = () => {
    Object.entries(localStorage).map((arr) => {
      return localTodos.push(JSON.parse(arr[1]));
    });
    // console.log(
    //   localTodos.filter((todo) => todo.category === category),
    //   "local storage read"
    // );
    setTodos(
      localTodos
        .filter((todo) => todo.category === category)
        .sort((prev, el) => {
          return el.id - prev.id;
        })
    );
    // };
    // getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, recoilTodo]); // recoil value 를 주시하며 변화생기면 리렌더링하는 용도로 사용!!!

  return (
    <div>
      <h1>TO DOs</h1>
      <select onInput={onInput} value={category}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateTodo />
      {todos?.map((todo) => {
        return <Todo key={todo.id} {...todo} />;
      })}
    </div>
  );
};

export default ToDoList;
