import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "../atoms";

interface IForm {
  todo: string;
}

const CreateTodo = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);

  const handleValid = (data: IForm) => {
    // console.log("add to do : ", data.todo);
    setValue("todo", ""); // validation 통과하면 input 비워주기
    setTodos((old) => {
      return [{ text: data.todo, category: category, id: Date.now() }, ...old];
    });
  };

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
