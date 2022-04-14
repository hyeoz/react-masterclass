import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, todoState } from "../atoms";

interface IForm {
  todo: string;
}

const CreateTodo = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const [todos, setTodos] = useRecoilState(todoState);
  const category = useRecoilValue(categoryState);

  // const [values, setValues] = useLocalStorage(todos[0]?.id.toString());

  const handleValid = (data: IForm) => {
    // console.log("add to do : ", data);
    setValue("todo", ""); // validation 통과하면 input 비워주기
    setTodos((old) => {
      return [{ text: data.todo, category: category, id: Date.now() }, ...old];
    });
  };

  useEffect(() => {
    // 코드챌린지. local storage 저장기능
    if (
      !localStorage.getItem(todos[0]?.id.toString()) &&
      JSON.stringify(todos[0]) !== undefined
    ) {
      // setValues(JSON.stringify(todos[0]));
      localStorage.setItem(todos[0]?.id.toString(), JSON.stringify(todos[0]));
    }
  });

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("todo", {
          required: "Please write a To Do",
        })}
        placeholder="write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateTodo;
