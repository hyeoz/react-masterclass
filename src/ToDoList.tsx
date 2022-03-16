import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  todo: string;
}

const ToDoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log("add to do", data.todo);
    setValue("todo", ""); // validation 통과하면 input 비워주기
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("todo", {
            required: "Please write a To Do",
          })}
          placeholder="write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

// useForm 에 type 설정해주기
// interface IForm {
//   email: string;
//   first_name: string;
//   last_name: string;
//   id: string;
//   password: string;
//   password2: string;
//   extraError?: string;
// }

// const ToDoList = () => {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     // input 에 default value 미리 채워놓을 수 있음
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   const onValid = (data: IForm) => {
//     // 모든 validation 이 끝났을 때 실행
//     // console.log(data);
//     if (data.password !== data.password2) {
//       // error 를 걸러줄 수 있음
//       return setError(
//         "password",
//         { message: "Password are not the same" },
//         { shouldFocus: true }
//       ); // 특정 에러에 대해 커서 포커스 옮김
//     }
//     setError("extraError", { message: "Server offline" }); // 전체 form 에 적용되는 에러
//   };
//   // console.log(watch()); // form 안의 값을 추적할 수 있음
//   // console.log(errors); // 에러를 자동으로 감지해서 출력해줌

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit(onValid)}
//         style={{ display: "flex", flexDirection: "column" }}
//       >
//         {/* register 함수의 결과값
//         name: "todo"
//         onBlur: async event => {…}
//         onChange: async event => {…}
//         ref: ref => {…}
//         [[Prototype]]: Object
//         이것은 ... 얕은 복사 해주면 각각 들어감
//         */}
//         <input
//           placeholder="write a email"
//           {...register("email", {
//             required: "Email required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only for the naver email is allowed",
//             },
//           })}
//         />
//         <span>{errors?.email?.message}</span>
//         {/* HTML 태그로 requires 넣지 않는 이유는 구형 브라우저에서 작동하지 않거나 소스코드를 직접 수정할 수 있기 때문에 JS 로 처리해주는 것 */}
//         <input
//           placeholder="write a first_name"
//           {...register("first_name", {
//             required: "first_name is required",
//             validate: { // async, await 으로 api 통신도 가능
//               noHyes: (value) =>
//                 value.includes("hye") ? "no hye is allowed" : true,
//             }, // 함수를 받고, value 는 현재 값(first_name)을 받음. true/false 를 반환
//             minLength: {
//               value: 5,
//               message: "Your first name is too short",
//               // message 이렇게 작성하는 방법도 있음
//             },
//           })}
//         />
//         <span>{errors?.first_name?.message}</span>

//         <input
//           placeholder="write a last_name"
//           {...register("last_name", { required: "last_name is required" })}
//         />
//         <span>{errors?.last_name?.message}</span>

//         <input
//           placeholder="write a id"
//           {...register("id", { required: "id is required" })}
//         />
//         <span>{errors?.id?.message}</span>

//         <input
//           placeholder="write a password"
//           {...register("password", { required: "password is required" })}
//         />
//         <span>{errors?.password?.message}</span>

//         <input
//           placeholder="write a password2"
//           {...register("password2", { required: "Password is required" })} // required 에 문자열 넣으면 error message 에 출력
//         />
//         <span>{errors?.password2?.message}</span>
//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// };

export default ToDoList;
